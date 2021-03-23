/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Action } from './action';
import { Position } from './position';
import { default as skins } from './characterSkins.json';

// import Blockly from 'blockly';
export class Character {
  x: number;
  y: number;
  position: Position;
  canvas: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  skin: number;

  currentLevel: number[][];

  block: { height: number; width: number };

  constructor(
    location: { x: number; y: number; position: Position },
    canvas: HTMLCanvasElement,
    currentLevel,
    block: { height: number; width: number },
    skin?: number
  ) {
    this.x = location.x;
    this.y = location.y;
    this.position = location.position;
    this.canvas = canvas;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.skin = skin ? skin : 0;
    this.currentLevel = currentLevel;
    this.block = block;
    this.draw();
  }

  action(
    location?: { x: number; y: number; position: Position },
    action?: Action
  ): { x: number; y: number; position: Position } {
    if (location) {
      this.x = location.x;
      this.y = location.y;
      this.position = location.position;
    }
    switch (this.position) {
      case Position.Left:
        this.x -= skins[this.skin].speed;
        break;
      case Position.Right:
        this.x += skins[this.skin].speed;
        break;
      case Position.Down:
        this.y -= skins[this.skin].speed;
        break;
      case Position.Up:
        this.y += skins[this.skin].speed;
        break;
      default:
        break;
    }
    return { x: this.x, y: this.y, position: this.position };
  }

  draw(): void {
    // load images
    const images = { char: new Image() };
    images.char.src = skins[0].sprite;
    images.char.onload = () => this.drawChar(images.char);
    // window.addEventListener('resize', () => {
    //   // canvas.height = window.innerHeight;
    //   // canvas.width = window.innerWidth;
    // });
  }
  drawChar(sprite) {
    this.context!.drawImage(
      sprite,
      skins[this.skin].startX,
      skins[this.skin].startY +
        skins[this.skin][Position[Position.left]].minFrame *
          skins[this.skin].height,
      skins[this.skin].width,
      skins[this.skin].height,
      (this.x * this.canvas.width) / (this.currentLevel[0].length * 2) -
        (this.y * this.canvas.height) / (this.currentLevel.length * 2) +
        this.canvas.width / 2.1111 -
        this.block.width,
      (this.y * this.canvas.height) / (this.currentLevel.length * 4) +
        (this.x * this.canvas.width) / (this.currentLevel[0].length * 4) +
        this.canvas.height / 4 -
        this.block.height,
      this.canvas.width / this.currentLevel[0].length,
      this.canvas.height / this.currentLevel.length
    );
  }
  update() {
    switch (this.position) {
      case Position.Left:
        this.x -= skins[this.skin].speed;
        break;
      case Position.Right:
        this.x += skins[this.skin].speed;
        break;
      case Position.Down:
        this.y -= skins[this.skin].speed;
        break;
      case Position.Up:
        this.y += skins[this.skin].speed;
        break;
      default:
        break;
    }
  }

  animate() {
    this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.draw();
    this.update();
  }
}
