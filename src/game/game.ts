/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Character } from './character';
import { Element } from './element';

// import Blockly from 'blockly';
export class Game {
  currentLevel: any;
  chars: Character[];

  skins = [
    {
      sprite: 'sprites/block.svg',
      startX: 20,
      startY: 0,
      width: 128,
      height: 128,
      // tiles: 'maze/tiles_pegman.png',
      // marker: 'maze/marker.png',
      // background: false,
      // look: '#000',
      // winSound: ['maze/win.mp3', 'maze/win.ogg'],
      // crashSound: ['maze/fail_pegman.mp3', 'maze/fail_pegman.ogg'],
      // crashType: Maze.CRASH_STOP
    },
  ];

  levels = [
    [
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, Element.BA + Element.CharRight, Element.BB + Element.C, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
      // eslint-disable-next-line prettier/prettier
      [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    [
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, Element.BA + Element.CharRight, Element.BB + Element.C, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    // Level 2.
    [
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, Element.BA + Element.CharRight, Element.BB + Element.C, Element.BA + Element.C, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ],
    // Level 3.
    [
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, Element.BA + Element.CU, Element.BB + Element.C, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      // eslint-disable-next-line prettier/prettier
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    ], //,
  ];
  canvas: HTMLCanvasElement;
  context?: CanvasRenderingContext2D;

  constructor(level?: number) {
    this.canvas = document.getElementsByClassName(
      'svgCanvas'
    )[0] as HTMLCanvasElement;
    const ctx = this.canvas.getContext('2d');
    this.context = ctx !== null ? ctx : undefined;
    this.refreshCanvas();
    this.chars = [];
    if (this.canvas) this.setLevel(level);
  }

  refreshCanvas(): void {
    const height = window.innerHeight;
    const width = window.innerWidth - 140;
    const smaller = height <= width ? height : width;
    this.canvas.height = smaller;
    this.canvas.width = smaller;
  }

  setLevel(level?: number): void {
    this.draw(level ? level : 0);
  }

  play() {}

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
    images.map.src = this.skins[0].sprite;
    const currentLevel = this.levels[level];
    images.map.onload = () =>
      this.drawMap(currentLevel, images.map, this.skins[0]);
    // window.addEventListener('resize', () => {
    //   // canvas.height = window.innerHeight;
    //   // canvas.width = window.innerWidth;
    // });
  }

  play() {}
}
