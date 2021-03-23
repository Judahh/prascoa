/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Position } from './position';
import { default as itemSkins } from './itemSkins.json';
import { GameObject } from './gameObject';

// import Blockly from 'blockly';
export class Item extends GameObject {
  constructor(
    location: { x: number; y: number; position: Position },
    currentLevel,
    block: { height: number; width: number },
    skin?: number
  ) {
    super(
      location,
      currentLevel,
      block,
      skin ? skin : 0,
      'svgCanvas3',
      itemSkins
    );
    this.draw();
  }
  drawChar(canvas) {
    const line = this.currentLevel[this.y];

    const realHeight =
      ((this.canvas.height / this.currentLevel.length) *
        (this.currentLevel.length + 3)) /
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
    console.log(this.position);

    this.context!.drawImage(
      canvas,
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
