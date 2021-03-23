/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { Element } from './element';

import Blockly from 'blockly';
import { levels } from './levels';
import { default as skins } from './blockSkins.json';
import { Audio } from './audio';
import { Item } from './item';
export class Game {
  protected currentLevel: number;
  protected _scores: Array<number | undefined>;
  protected chars: Character[];
  protected items: Item[];
  protected canvas: HTMLCanvasElement;
  protected context?: CanvasRenderingContext2D;
  protected audio: Audio;

  constructor(level?: number) {
    this.canvas = document.getElementsByClassName(
      'svgCanvas'
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.chars = [];
    this.items = [];
    this.currentLevel = level ? level : 0;
    this._scores = [];
    this._scores[0] = 0;
    for (let index = 1; index < levels.length; index++) {
      this._scores[index] = undefined;
    }
    if (this.canvas) this.level = this.currentLevel;
    this.audio = new Audio();
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
    return this.currentLevel;
  }

  set level(level: number) {
    this.currentLevel = level;
    this.draw(level ? level : 0);
  }

  play(simpleWorkspace) {
    // // Prevent double-clicks or double-taps.
    // if (BlocklyInterface.eventSpam(e)) {
    //   return;
    // }
    // BlocklyDialogs.hideDialog(false);
    // // Only allow a single top block on level 1.
    // if (
    //   BlocklyGames.LEVEL == 1 &&
    //   BlocklyInterface.workspace.getTopBlocks(false).length > 1 &&
    //   Maze.result != Maze.ResultType.SUCCESS &&
    //   !BlocklyGames.loadFromLocalStorage(BlocklyGames.NAME, BlocklyGames.LEVEL)
    // ) {
    //   Maze.levelHelp();
    //   return;
    // }
    // const runButton = document.getElementById('runButton');
    // const resetButton = document.getElementById('resetButton');
    // // Ensure that Reset button is at least as wide as Run button.
    // if (!resetButton.style.minWidth) {
    //   resetButton.style.minWidth = runButton.offsetWidth + 'px';
    // }
    // runButton.style.display = 'none';
    // resetButton.style.display = 'inline';
    // Maze.reset(false);
    // Maze.execute();
    console.log('PLAY Game');
    // console.log('PLAY: ', simpleWorkspace);

    console.log(Blockly.JavaScript.workspaceToCode(simpleWorkspace));
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
    this.context!.drawImage(
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
    this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  drawMap(currentLevel, map, blockSprite): void {
    this.clear();

    const realHeight =
      ((this.canvas.height / currentLevel.length) * (currentLevel.length + 1)) /
      2;
    const addHeight = (this.canvas.height - realHeight) / 2;

    for (let y = 0; y < currentLevel.length; y++) {
      const line = currentLevel[y];
      for (let x = 0; x < line.length; x++) {
        const addWidth =
          (this.canvas.width / line.length) * ((line.length - 1) / 2);

        if (currentLevel[y][x])
          this.drawXY(
            map,
            blockSprite,
            line.length,
            currentLevel.length,
            addWidth,
            addHeight,
            x,
            y
          );
        if (
          currentLevel[y][x] >= Element.Char &&
          currentLevel[y][x] < Element.Carrot
        )
          this.chars.push(
            new Character(
              { x, y, position: Math.trunc(currentLevel[y][x] / Element.Char) },
              currentLevel,
              {
                height: currentLevel.length,
                width: currentLevel.length,
              }
            )
          );
        if (currentLevel[y][x] >= Element.Carrot)
          this.items.push(
            new Item(
              {
                x,
                y,
                position: Math.trunc(currentLevel[y][x] / Element.Carrot),
              },
              currentLevel,
              {
                height: currentLevel.length,
                width: currentLevel.length,
              }
            )
          );
      }
    }
  }

  calcScore(carrots: number, blocks: number, steps: number) {
    return (1000 * Math.pow(carrots, 2)) / (blocks * steps);
  }

  draw(level: number): void {
    // load images
    const images = { map: new Image() };
    images.map.src = skins[0].sprite;
    const currentLevel = levels[level];
    images.map.onload = () => this.drawMap(currentLevel, images.map, skins[0]);
    // window.addEventListener('resize', () => {
    //   // canvas.height = window.innerHeight;
    //   // canvas.width = window.innerWidth;
    // });
  }
}
