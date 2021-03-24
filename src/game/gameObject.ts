/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Action } from './action';
import { Position } from './position';
import { Audio } from './audio';
import { default as charSkins } from './characterSkins.json';

// import Blockly from 'blockly';
export class GameObject {
  x: number;
  y: number;
  position: Position;
  canvas: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  skin: number;
  currentLevel: number[][];
  block: { height: number; width: number };
  skins = charSkins;
  protected audio: any;
  constructor(
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin: number,
    canvasClass: string,
    skins: any
  ) {
    this.x = location.x;
    this.y = location.y;
    this.position = location.position;
    this.skins = skins;
    this.canvas = document.getElementsByClassName(
      canvasClass
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.skin = skin;
    this.currentLevel = currentLevel;
    this.block = block;
    this.audio = {};
    this.draw();
  }

  refreshCanvas(): void {
    const height = window.innerHeight - 70;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
  }

  action(
    location?: { x: number; y: number; position: Position },
    _action?: Action
  ): { x: number; y: number; position: Position } {
    if (location) {
      this.x = location.x;
      this.y = location.y;
      this.position = location.position;
    }
    switch (this.position) {
      case Position.Left:
        this.x -= this.skins[this.skin].speed;
        break;
      case Position.Right:
        this.x += this.skins[this.skin].speed;
        break;
      case Position.Down:
        this.y -= this.skins[this.skin].speed;
        break;
      case Position.Up:
        this.y += this.skins[this.skin].speed;
        break;
      default:
        break;
    }
    return { x: this.x, y: this.y, position: this.position };
  }

  draw(): void {
    // load images
    const images = { char: new Image() };
    images.char.src = this.skins[0].sprite;
    images.char.onload = () => this.drawChar(images.char);
    // window.addEventListener('resize', () => {
    //   // canvas.height = window.innerHeight;
    //   // canvas.width = window.innerWidth;
    // });
  }
  drawChar(canvas): void {
    const line = this.currentLevel[this.y];

    const realHeight =
      ((this.canvas.height / this.currentLevel.length) *
        (this.currentLevel.length + 2.5)) /
      2;
    const addHeight = (this.canvas.height - realHeight) / 2;
    const addWidth =
      (this.canvas.width / line.length) * ((line.length - 1) / 2);

    this.drawXY(
      canvas,
      line.length,
      this.currentLevel.length,
      addWidth,
      addHeight
    );
  }

  drawXY(
    canvas,
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number
  ): void {
    this.context?.drawImage(
      canvas,
      this.skins[this.skin].startX,
      this.skins[this.skin].startY +
        this.skins[this.skin][Position[this.position]].minFrame *
          this.skins[this.skin].height,
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

  update(): void {
    switch (this.position) {
      case Position.Left:
        this.x -= this.skins[this.skin].speed;
        break;
      case Position.Right:
        this.x += this.skins[this.skin].speed;
        break;
      case Position.Down:
        this.y -= this.skins[this.skin].speed;
        break;
      case Position.Up:
        this.y += this.skins[this.skin].speed;
        break;
      default:
        break;
    }
  }

  animate(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    this.update();
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
