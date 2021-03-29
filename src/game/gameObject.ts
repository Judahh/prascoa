// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Position } from './position';
import { Audio } from './audio';
import { default as charSkins } from './characterSkins.json';
import { SharedCanvas } from './sharedCanvas';

// import Blockly from 'blockly';
export class GameObject {
  x?: number;
  y?: number;
  position: Position;
  skin: number;
  currentLevel: number[][];
  block: { height: number; width: number };
  skins = charSkins;
  protected audio: any;
  protected sprite: number;
  protected idleId;
  protected canvas: SharedCanvas;
  protected canvasIndex: number;
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin: number,
    skins: any
  ) {
    this.x = location.x;
    this.y = location.y;
    this.position = location.position;
    this.skins = skins;
    this.skin = skin;
    this.canvas = canvas;
    this.canvasIndex = this.canvas.addObject();
    this.currentLevel = currentLevel;
    this.block = block;
    this.audio = {};
    // console.log('skin:', this.skin);
    // console.log('skins:', this.skins);
    const skinF = this.skins[this.skin][Position[this.position]];
    const min = skinF.minFrame;
    this.sprite = min;
    // this.initMotion();
  }
  async draw(action?: boolean, waitIdle?: boolean): Promise<void> {
    if (
      this.y !== undefined &&
      Math.trunc(this.y) >= 0 &&
      Math.trunc(this.y) < this.currentLevel.length &&
      this.currentLevel[Math.trunc(this.y)]
    ) {
      const line = this.currentLevel[Math.trunc(this.y)];
      // console.log(this.y);
      // console.log(this.currentLevel);

      const realHeight =
        ((this.canvas.height / this.currentLevel.length) *
          (this.currentLevel.length + 2.5)) /
        2;
      const addHeight = (this.canvas.height - realHeight) / 2;
      const addWidth =
        (this.canvas.width / line.length) * ((line.length - 1) / 2);

      await this.drawWithAdd(
        line.length,
        this.currentLevel.length,
        addWidth,
        addHeight,
        action,
        waitIdle
      );
    } else {
      await this.drawWithAdd(0, 0, 0, 0, action, waitIdle);
    }
  }
  async drawWithAdd(
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number,
    action?: boolean,
    waitIdle?: boolean
  ): Promise<void> {
    // console.log('drawWithAdd', action);
    if (
      this.x !== undefined &&
      this.y !== undefined &&
      Math.trunc(this.y) >= 0 &&
      Math.trunc(this.y) < this.currentLevel.length &&
      Math.trunc(this.x) >= 0 &&
      this.currentLevel[Math.trunc(this.y)] &&
      Math.trunc(this.x) < this.currentLevel[Math.trunc(this.y)].length &&
      this.currentLevel[Math.trunc(this.y)][Math.trunc(this.x)]
    ) {
      // console.log('drawWithAdd');
      const skin = this.skins[this.skin][Position[this.position]];
      const min = action ? skin.action.minFrame : skin.minFrame;
      const max = action ? skin.action.maxFrame : skin.maxFrame;

      if (action) {
        // const end = this.sprite === max;
        this.sprite =
          this.sprite < min
            ? min
            : this.sprite > max
            ? max
            : this.sprite === max
            ? min
            : this.sprite + 1;
      } else {
        this.sprite =
          this.sprite < min
            ? min
            : this.sprite > max
            ? max
            : this.sprite === max
            ? max
            : this.sprite + 1;
      }

      await this.drawImage(
        this.skins[this.skin].startX,
        this.skins[this.skin].startY +
          this.sprite * this.skins[this.skin].height,
        this.skins[this.skin].width,
        this.skins[this.skin].height,
        (this.x * this.canvas.width) / (numberOfColumns * 2) -
          (this.y * this.canvas.height) / (numberOfRows * 2) +
          addWidth,
        (this.y * this.canvas.height) / (numberOfRows * 4) +
          (this.x * this.canvas.width) / (numberOfColumns * 4) +
          addHeight,
        this.canvas.width / numberOfColumns,
        this.canvas.height / numberOfRows
      );
      if (!action)
        if (this.sprite === max) {
          // console.log('this.sprite is max', this.sprite);
        } else {
          // console.log('this.sprite', this.sprite);
          // console.log('max', max);

          if (waitIdle) {
            await this.draw(action, waitIdle);
          } else {
            this.draw(action, waitIdle);
          }
        }
    } else {
      await this.drawImage(0, 0, 0, 0, 0, 0, 0, 0);
    }
  }
  async drawImage(
    imageStartX: number,
    imageStartY: number,
    imageWidth: number,
    imageHeight: number,
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    await this.canvas.addDrawing(
      this.canvasIndex,
      this.skins[this.skin].sprite,
      imageStartX,
      imageStartY,
      imageWidth,
      imageHeight,
      x,
      y,
      canvasWidth,
      canvasHeight
    );
  }
  play(soundName: string): void {
    const sound = this.skins[this.skin][soundName];
    if (!this.audio[soundName]) this.audio[soundName] = new Audio(sound.url);

    (this.audio[soundName] as Audio).playSound(
      sound.delay,
      sound.loop,
      sound.start,
      sound.end
    );
  }
}
