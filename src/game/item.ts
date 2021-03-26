// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Position } from './position';
import { default as itemSkins } from './itemSkins.json';
import { GameObject } from './gameObject';
import { SharedCanvas } from './sharedCanvas';

// import Blockly from 'blockly';
export class Item extends GameObject {
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin?: number
  ) {
    super(canvas, location, currentLevel, block, skin ? skin : 0, itemSkins);
  }
  async drawObject(): Promise<void> {
    const line = this.currentLevel[this.y];

    const realHeight =
      ((this.canvas.height / this.currentLevel.length) *
        (this.currentLevel.length + 3)) /
      2;
    const addHeight = (this.canvas.height - realHeight) / 2;
    const addWidth =
      (this.canvas.width / line.length) * ((line.length - 1) / 2);

    await this.drawWithAdd(
      line.length,
      this.currentLevel.length,
      addWidth,
      addHeight
    );
  }

  async drawWithAdd(
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number
  ): Promise<void> {
    console.log(this.position);

    await this.drawImage(
      this.skins[this.skin].startX,
      this.skins[this.skin].startY +
        this.skins[this.skin][Position[1]].minFrame *
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
}
