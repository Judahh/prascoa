/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { Element } from './element';

import Blockly from 'blockly';
import { levels } from './levels';
import { default as skins } from './blockSkins.json';
export class Game {
  protected currentLevel: number;
  protected _scores: number[];
  protected chars: Character[];
  protected canvas: HTMLCanvasElement;
  protected context?: CanvasRenderingContext2D;

  constructor(level?: number) {
    this.canvas = document.getElementsByClassName(
      'svgCanvas'
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.chars = [];
    this.currentLevel = level ? level : 0;
    this._scores = [];
    for (let index = 0; index < levels.length; index++) {
      this._scores[index] = 0;
    }
    if (this.canvas) this.level = this.currentLevel;
  }

  get scores(): number[] {
    return this.scores;
  }

  get score(): number {
    return this.scores.reduce(
      (previousValue: number, currentValue: number) =>
        previousValue + currentValue
    );
  }

  refreshCanvas(): void {
    const height = window.innerHeight;
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

  drawMap(currentLevel, map, blockSprite): void {
    this.context!.clearRect(0, 0, this.canvas.width, this.canvas.height);
    for (let y = 0; y < currentLevel.length; y++) {
      const line = currentLevel[y];
      for (let x = 0; x < line.length; x++) {
        // const element = line[x];
        // if (currentLevel[y][x])
        // console.log(currentLevel.length);
        // console.log(line.length);
        // console.log(blockSprite);
        if (currentLevel[y][x])
          this.context!.drawImage(
            map,
            blockSprite.startX,
            blockSprite.startY,
            blockSprite.width,
            blockSprite.height,
            (x * this.canvas.width) / (line.length * 2) -
              (y * this.canvas.height) / (currentLevel.length * 2) +
              this.canvas.width / 2.1111,
            (y * this.canvas.height) / (currentLevel.length * 4) +
              (x * this.canvas.width) / (line.length * 4) +
              this.canvas.height / 4,
            this.canvas.width / line.length,
            this.canvas.height / currentLevel.length
          );
        if (
          currentLevel[y][x] >= Element.Char &&
          currentLevel[y][x] < Element.Carrot
        )
          this.chars.push(
            new Character(
              { x, y, position: currentLevel[y][x] / Element.Char },
              this.canvas,
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
