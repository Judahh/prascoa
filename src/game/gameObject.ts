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
  x: number;
  y: number;
  position: Position;
  skin: number;
  currentLevel: number[][];
  block: { height: number; width: number };
  skins = charSkins;
  protected audio: any;
  protected sprite: number;
  protected idleId;
  protected image;
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
    this.canvasIndex = this.canvas.objects.push(this) - 1;
    this.currentLevel = currentLevel;
    this.block = block;
    this.audio = {};
    this.image = {};
    this.image[this.skin] = { element: new Image() };
    // console.log('skin:', this.skin);
    // console.log('skins:', this.skins);
    const skinF = this.skins[this.skin][Position[this.position]];
    const min = skinF.minFrame;
    this.sprite = min;
    // this.initMotion();
  }

  async redraw(action?: boolean) {
    // console.log('redraw');
    this.canvas.clear();
    await this.draw(action);
  }
  getDecimalPart(number: number): number {
    const decimal = number % 1;
    return Math.round(decimal * 100000000) / 100000000;
  }

  load(action?: boolean): Promise<boolean> {
    return new Promise((resolve) => {
      this.image[this.skin].element.onload = () => {
        this.drawObject(action);
        resolve(true);
        // this.image[this.skin].loaded = true;
      };
    });
  }

  //! TODO: use sharedCanvas for store images
  async draw(action?: boolean): Promise<void> {
    this.image[this.skin].element.src = this.skins[this.skin].sprite;
    // if (this.image[this.skin].loaded) await this.drawObject(action);
    // else
    await this.load(action);
  }
  async drawObject(action?: boolean): Promise<void> {
    const line = this.currentLevel[this.y];

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
      action
    );
  }

  async drawWithAdd(
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number,
    action?: boolean
  ): Promise<void> {
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
      // if (end) {
      //   // clearInterval(this.idleId);
      //   // this.idleId = undefined;
      //   console.log('clear A');
      // } else {
      //   // if (!this.idleId)
      //   //   this.idleId = setInterval(this.redraw.bind(this), 100);
      //   // this.canvas.clear();
      //   console.log('set A');
      // }
    } else {
      this.sprite =
        this.sprite < min
          ? min
          : this.sprite > max
          ? max
          : this.sprite === max
          ? max
          : this.sprite + 1;
      if (this.sprite === max) {
        clearInterval(this.idleId);
        this.idleId = undefined;
        // console.log('clear I');
      } else {
        if (!this.idleId)
          this.idleId = setInterval(this.redraw.bind(this), 100);
        // console.log('set I');
        // this.canvas.clear();
      }
    }
    // console.log(this.sprite);

    await this.drawImage(
      this.skins[this.skin].startX,
      this.skins[this.skin].startY + this.sprite * this.skins[this.skin].height,
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
    await this.canvas.draw(
      this.canvasIndex,
      this.image[this.skin].element,
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
