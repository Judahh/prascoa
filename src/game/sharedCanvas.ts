// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { GameObject } from './gameObject';

// import Blockly from 'blockly';
export class SharedCanvas {
  canvas: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;
  protected _objects: GameObject[];
  protected refreshId;
  protected cleared: boolean;
  constructor(canvasClass: string) {
    this.canvas = document.getElementsByClassName(
      canvasClass
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.cleared = true;
    this._objects = [];
    this.refreshCanvas();
    // this.refreshId = setInterval(this.draw.bind(this), 100);
  }

  get objects() {
    return this._objects;
  }

  refreshCanvas(): void {
    const height = window.innerHeight - 70;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
    this.clear();
  }

  async draw(
    currentIndex: number,
    image: HTMLImageElement,
    imageStartX: number,
    imageStartY: number,
    imageWidth: number,
    imageHeight: number,
    x: number,
    y: number,
    canvasWidth: number,
    canvasHeight: number
  ) {
    if (this.cleared) {
      // console.log('cleared');
      this.cleared = false;
      for (let index = 0; index < this.objects.length; index++) {
        if (currentIndex !== index) {
          const object = this.objects[index];
          await object.draw();
        } else {
          this.context?.drawImage(
            image,
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
      }
    } else {
      // console.log('regular');
      this.context?.drawImage(
        image,
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
  }

  clear() {
    // console.log('clear CANVAS');
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.cleared = true;
  }

  get height(): number {
    return this.canvas.height;
  }

  get width(): number {
    return this.canvas.width;
  }
}
