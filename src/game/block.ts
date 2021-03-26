// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Position } from './position';
import { default as blockSkins } from './blockSkins.json';
import { GameObject } from './gameObject';
import { SharedCanvas } from './sharedCanvas';

// import Blockly from 'blockly';
export class Block extends GameObject {
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin?: number
  ) {
    super(canvas, location, currentLevel, block, skin ? skin : 0, blockSkins);
    // console.log('skin', this.skin);
    // console.log('sprite', this.skin);
  }
  async drawObject(): Promise<void> {
    if (this.y !== undefined) {
      const line = this.currentLevel[this.y];

      const realHeight =
        ((this.canvas.height / this.currentLevel.length) *
          (this.currentLevel.length + 1)) /
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
    } else await this.drawWithAdd(0, 0, 0, 0);
  }

  async drawWithAdd(
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number
  ): Promise<void> {
    // console.log(this.skins[this.skin].height);

    // this.context?.drawImage(
    //   map,
    //   blockSprite.startX,
    //   blockSprite.startY,
    //   blockSprite.width,
    //   blockSprite.fullHeight,
    //   (x * this.canvas.width) / (numberOfColumns * 2) -
    //     (y * this.canvas.height) / (numberOfRows * 2) +
    //     addWidth,
    //   (y * this.canvas.height) / (numberOfRows * 4) +
    //     (x * this.canvas.width) / (numberOfColumns * 4) +
    //     addHeight,
    //   this.canvas.width / numberOfColumns,
    //   this.canvas.height / numberOfRows
    // );
    if (this.x !== undefined && this.y !== undefined)
      await this.drawImage(
        this.skins[this.skin].startX,
        this.skins[this.skin].startY,
        this.skins[this.skin].width,
        this.skins[this.skin].height * 2,
        (this.x * this.canvas.width) / (numberOfColumns * 2) -
          (this.y * this.canvas.height) / (numberOfRows * 2) +
          addWidth,
        (this.y * this.canvas.height) / (numberOfRows * 4) +
          (this.x * this.canvas.width) / (numberOfColumns * 4) +
          addHeight,
        this.canvas.width / numberOfColumns,
        this.canvas.height / numberOfRows
      );
    else await this.drawImage(0, 0, 0, 0, 0, 0, 0, 0);
  }
}
