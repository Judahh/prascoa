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
  protected objects: GameObject[];
  protected refreshId;
  constructor(canvasClass: string) {
    this.canvas = document.getElementsByClassName(
      canvasClass
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.objects = [];
    // this.refreshId = setInterval(this.draw.bind(this), 100);
  }

  refreshCanvas(): void {
    const height = window.innerHeight - 70;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
  }

  //! TODO: use journaly to subscribe to game objects, whe one of them call
  //! draw, clear the canvas and draw all of them with the current position
  //! of the caller.

  // draw(
  //   image,
  //   numberOfColumns: number,
  //   numberOfRows: number,
  //   addWidth: number,
  //   addHeight: number,
  //   action?: boolean
  // ): void {
  //   const skin = this.skins[this.skin][Position[this.position]];
  //   const min = action ? skin.action.minFrame : skin.minFrame;
  //   const max = action ? skin.action.maxFrame : skin.maxFrame;

  //   if (action)
  //     this.sprite =
  //       this.sprite < min
  //         ? min
  //         : this.sprite > max
  //         ? max
  //         : this.sprite === max
  //         ? (this.sprite = min)
  //         : this.sprite + 1;
  //   else {
  //     this.sprite =
  //       this.sprite < min
  //         ? min
  //         : this.sprite > max
  //         ? max
  //         : this.sprite === max
  //         ? (this.sprite = max)
  //         : this.sprite + 1;
  //     if (this.sprite === max) clearInterval(this.idleId);
  //   }
  //   // console.log(this.sprite);

  //   this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  //   this.context?.drawImage(
  //     image,
  //     this.skins[this.skin].startX,
  //     this.skins[this.skin].startY + this.sprite * this.skins[this.skin].height,
  //     this.skins[this.skin].width,
  //     this.skins[this.skin].height,
  //     (this.x * this.canvas.width) / (numberOfColumns * 2) -
  //       (this.y * this.canvas.height) / (numberOfRows * 2) +
  //       addWidth,
  //     (this.y * this.canvas.height) / (numberOfRows * 4) +
  //       (this.x * this.canvas.width) / (numberOfColumns * 4) +
  //       addHeight,
  //     this.canvas.width / numberOfColumns,
  //     this.canvas.height / numberOfRows
  //   );
  // }
}
