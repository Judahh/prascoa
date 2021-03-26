// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { getBlock, getChar, getItem, getPosition } from './element';

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
  protected _currentScore: number;
  protected chars: Character[];
  protected items: Item[];
  protected blocks: Block[];
  protected started: boolean;
  protected canvases: SharedCanvas[];
  protected numOfItems: number;
  protected totalNumOfItems: number;

  constructor(level?: number) {
    this.numOfItems = 0;
    this.totalNumOfItems = 0;
    this.chars = [];
    this.items = [];
    this.blocks = [];
    this.canvases = [
      new SharedCanvas('svgCanvas'),
      new SharedCanvas('svgCanvas2'),
      new SharedCanvas('svgCanvas3'),
    ];
    this._currentScore = 0;
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
    return this._currentScore;
  }

  get level(): number {
    return this._level;
  }

  set level(level: number) {
    this._level = level;
    this._currentLevel = JSON.parse(JSON.stringify(levels[level]));
    for (const canvas of this.canvases) {
      canvas.clear();
    }
    this.drawMap();
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

  async reset() {
    this.numOfItems = 0;
    this.totalNumOfItems = 0;
    this.chars = [];
    this.items = [];
    this.blocks = [];
    this.canvases[1] = new SharedCanvas('svgCanvas2');
    this.canvases[2] = new SharedCanvas('svgCanvas3');
    this._currentLevel = JSON.parse(JSON.stringify(levels[this.level]));
    await this.draw();
  }

  addItem(steps: number) {
    this._currentScore += 1000 / steps;
    this.numOfItems++;
  }

  async gotItem(x: number, y: number, steps: number) {
    console.log('GOT ITEM!');
    const itemIndex = this.items.findIndex((item: Item) => {
      return item.x === x && item.y === y;
    });
    if (itemIndex !== -1) {
      await this.items[itemIndex].destroy();
      this.addItem(steps);
      this.items.splice(itemIndex, 1);
    }
  }

  async died() {
    // animação de queda
    await this.reset();
  }

  async play(simpleWorkspace: any): Promise<void> {
    console.log('PLAY Game');
    this.printLevel();

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const code = Blockly.JavaScript.workspaceToCode(simpleWorkspace);
    const checks = (code.match(/this.check/g) || []).length;
    const actions = (code.match(/this.action/g) || []).length;
    for (const char of this.chars) {
      try {
        await char.execute(code);
      } catch (error) {
        console.log('Received an Error from Execute:', error.message);
        if (error.message === 'Died') this.died();
        return;
      }
    }
    // console.log('A SCORE:', this._currentScore);
    const blocklys = checks + actions;
    // console.log(blocklys);
    // console.log(actions);
    // console.log(checks);

    const addScore = (this.numOfItems * 1000) / blocklys;
    this._currentScore += addScore;
    console.log('ADD SCORE:', addScore);
    console.log('DONE SCORE:', this._currentScore);
    console.log('ITEMS:', this.numOfItems);
    console.log('TOTAL:', this.totalNumOfItems);
    this.printLevel();
    if (this.totalNumOfItems === this.numOfItems) {
      if (
        !this._scores[this.level] ||
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        this._currentScore >= this._scores[this.level]
      )
        this._scores[this.level] = this._currentScore;
      if (this._level < levels.length - 1) this.level++;
    } else {
      await this.reset();
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

  async draw(): Promise<void> {
    if (this._currentLevel) {
      for (let y = 0; y < this._currentLevel.length; y++) {
        const line = this._currentLevel[y];
        for (let x = 0; x < line.length; x++) {
          const charE = getChar(this._currentLevel[y][x]);
          const itemE = getItem(this._currentLevel[y][x]);
          if (charE) {
            // console.log(x, y);
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
              this.gotItem.bind(this),
              charE - 1
            );
            await char.draw(undefined, false);
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
  }

  async drawMap(): Promise<void> {
    if (this._currentLevel) {
      for (let y = 0; y < this._currentLevel.length; y++) {
        const line = this._currentLevel[y];
        for (let x = 0; x < line.length; x++) {
          const blockE = getBlock(this._currentLevel[y][x]);
          if (blockE) {
            // console.log(blockE);
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
        }
      }
    }

    if (!this.started) {
      this.chars[0].play('themeSound');
      this.started = true;
    }

    if (this.totalNumOfItems === 0) this.totalNumOfItems = this.items.length;
  }

  calcScore(carrots: number, blocks: number, steps: number) {
    return (1000 * Math.pow(carrots, 2)) / (blocks * steps);
  }
}
