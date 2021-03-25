// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { Element } from './element';

import Blockly from 'blockly';
import { levels } from './levels';
import { default as skins } from './blockSkins.json';
import { Item } from './item';
export class Game {
  protected _level: number;
  protected _currentLevel?: number[][];
  protected _scores: Array<number | undefined>;
  protected chars: Character[];
  protected items: Item[];
  protected canvas: HTMLCanvasElement;
  protected context?: CanvasRenderingContext2D;
  protected started: boolean;

  constructor(level?: number) {
    this.canvas = document.getElementsByClassName(
      'svgCanvas'
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.chars = [];
    this.items = [];
    this._level = level ? level : 0;
    this._scores = [];
    this._scores[0] = 0;
    this.started = false;
    for (let index = 1; index < levels.length; index++) {
      this._scores[index] = undefined;
    }
    if (this.canvas) this.level = this._level;
  }

  get scores(): Array<number | undefined> {
    return this._scores;
  }

  get score(): number {
    const score = this.scores.reduce(
      (previousValue: number | undefined, currentValue: number | undefined) => {
        const p: number = previousValue === undefined ? 0 : previousValue;
        const c: number = currentValue === undefined ? 0 : currentValue;
        return p + c;
      }
    );
    return score === undefined ? 0 : score;
  }

  get currentScore(): number {
    const score = this.scores[this.level];
    return score === undefined ? 0 : score;
  }

  refreshCanvas(): void {
    const height = window.innerHeight - 70;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
  }

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
    this._currentLevel = JSON.parse(JSON.stringify(levels[level]));
    this.draw();
  }

  play(simpleWorkspace: any): void {
    console.log('PLAY Game');

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const code = Blockly.JavaScript.workspaceToCode(simpleWorkspace);
    for (const char of this.chars) {
      char.execute(code);
    }
  }

  getNode(n: any, v: any): any {
    n = document.createElementNS('http://www.w3.org/2000/svg', n);
    for (const p in v) n.setAttributeNS(null, p, v[p]);
    return n;
  }

  min2(a: number, b: number): number {
    return a < b ? a : b;
  }
  min3(a: number, b: number, c: number): number {
    return this.min2(this.min2(a, b), c);
  }
  max(a: number, b: number): number {
    return a > b ? a : b;
  }

  drawXY(
    map,
    blockSprite,
    numberOfColumns: number,
    numberOfRows: number,
    addWidth: number,
    addHeight: number,
    x: number,
    y: number
  ): void {
    this.context?.drawImage(
      map,
      blockSprite.startX,
      blockSprite.startY,
      blockSprite.width,
      blockSprite.fullHeight,
      (x * this.canvas.width) / (numberOfColumns * 2) -
        (y * this.canvas.height) / (numberOfRows * 2) +
        addWidth,
      (y * this.canvas.height) / (numberOfRows * 4) +
        (x * this.canvas.width) / (numberOfColumns * 4) +
        addHeight,
      this.canvas.width / numberOfColumns,
      this.canvas.height / numberOfRows
    );
  }

  clear(): void {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawMap(map, blockSprite): void {
    this.clear();
    if (this._currentLevel) {
      const realHeight =
        ((this.canvas.height / this._currentLevel.length) *
          (this._currentLevel.length + 1)) /
        2;
      const addHeight = (this.canvas.height - realHeight) / 2;

      for (let y = 0; y < this._currentLevel.length; y++) {
        const line = this._currentLevel[y];
        for (let x = 0; x < line.length; x++) {
          const addWidth =
            (this.canvas.width / line.length) * ((line.length - 1) / 2);

          if (this._currentLevel[y][x])
            this.drawXY(
              map,
              blockSprite,
              line.length,
              this._currentLevel.length,
              addWidth,
              addHeight,
              x,
              y
            );
          if (
            this._currentLevel[y][x] >= Element.Char &&
            this._currentLevel[y][x] < Element.Carrot
          )
            this.chars.push(
              new Character(
                {
                  x,
                  y,
                  position: Math.trunc(this._currentLevel[y][x] / Element.Char),
                },
                this._currentLevel,
                {
                  height: this._currentLevel.length,
                  width: this._currentLevel.length,
                }
              )
            );
          if (this._currentLevel[y][x] >= Element.Carrot)
            this.items.push(
              new Item(
                {
                  x,
                  y,
                  position: Math.trunc(
                    this._currentLevel[y][x] / Element.Carrot
                  ),
                },
                this._currentLevel,
                {
                  height: this._currentLevel.length,
                  width: this._currentLevel.length,
                }
              )
            );
        }
      }
    }

    if (!this.started) {
      this.chars[0].play('themeSound');
      this.started = true;
    }
  }

  calcScore(carrots: number, blocks: number, steps: number) {
    return (1000 * Math.pow(carrots, 2)) / (blocks * steps);
  }

  draw(): void {
    const images = { map: new Image() };
    images.map.src = skins[0].sprite;
    images.map.onload = () => this.drawMap(images.map, skins[0]);
  }
}
