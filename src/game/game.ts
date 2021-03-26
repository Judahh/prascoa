// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { Element, getBlock, getChar, getItem, getPosition } from './element';

import Blockly from 'blockly';
import { levels } from './levels';
import { Item } from './item';
import { Block } from './block';
import { Position } from './position';
import { SharedCanvas } from './sharedCanvas';
export class Game {
  protected _level: number;
  protected _currentLevel?: number[][];
  protected _scores: Array<number | undefined>;
  protected chars: Character[];
  protected items: Item[];
  protected blocks: Block[];
  protected started: boolean;
  protected canvases: SharedCanvas[];

  constructor(level?: number) {
    this.chars = [];
    this.items = [];
    this.blocks = [];
    this.canvases = [
      new SharedCanvas('svgCanvas'),
      new SharedCanvas('svgCanvas2'),
      new SharedCanvas('svgCanvas3'),
    ];
    this._level = level ? level : 0;
    this._scores = [];
    this._scores[0] = 0;
    this.started = false;
    for (let index = 1; index < levels.length; index++) {
      this._scores[index] = undefined;
    }
    this.level = this._level;
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

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
    this._currentLevel = JSON.parse(JSON.stringify(levels[level]));
    this.draw();
  }

  printLevel() {
    if (this._currentLevel)
      for (const line of this._currentLevel) {
        let sLine = '';
        for (const element of line) {
          sLine += '(' + element + '), ';
        }
        console.log(sLine);
      }
  }

  async play(simpleWorkspace: any): Promise<void> {
    console.log('PLAY Game');
    this.printLevel();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const code = Blockly.JavaScript.workspaceToCode(simpleWorkspace);
    for (const char of this.chars) {
      await char.execute(code);
    }
    console.log('DONE');
    this.printLevel();
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

  async draw(): Promise<void> {
    if (this._currentLevel) {
      for (let y = 0; y < this._currentLevel.length; y++) {
        const line = this._currentLevel[y];
        for (let x = 0; x < line.length; x++) {
          const blockE = getBlock(this._currentLevel[y][x]);
          const charE = getChar(this._currentLevel[y][x]);
          const itemE = getItem(this._currentLevel[y][x]);
          if (blockE) {
            console.log(blockE);
            const block = new Block(
              this.canvases[0],
              {
                x,
                y,
                position: Position.None,
              },
              this._currentLevel,
              {
                height: this._currentLevel.length,
                width: this._currentLevel.length,
              },
              blockE - 1
            );
            await block.draw();
            this.blocks.push(block);
          }
          if (charE) {
            const char = new Character(
              this.canvases[1],
              {
                x,
                y,
                position: getPosition(this._currentLevel[y][x]),
              },
              this._currentLevel,
              {
                height: this._currentLevel.length,
                width: this._currentLevel.length,
              },
              charE - 1
            );
            await char.draw();
            this.chars.push(char);
          }
          if (itemE) {
            const item = new Item(
              this.canvases[2],
              {
                x,
                y,
                position: Position.None,
              },
              this._currentLevel,
              {
                height: this._currentLevel.length,
                width: this._currentLevel.length,
              },
              itemE - 1
            );
            await item.draw();
            this.items.push(item);
          }
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
}
