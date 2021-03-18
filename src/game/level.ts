/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { Element } from './element';

// import Blockly from 'blockly';
export class Level {
  currentLevel: any;

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
  constructor(level?: number) {
    this.nextLevel(level);
  }

  nextLevel(level?: number): void {
    // if (this.currentLevel < this.levels.length) {
    //   window.location = window.location.protocol + '//' +
    //       window.location.host + window.location.pathname +
    //       '?lang=' + BlocklyGames.LANG + '&level=' + (BlocklyGames.LEVEL + 1) +
    //       '&skin=' + Maze.SKIN_ID;
    // } else {
    //   BlocklyInterface.indexPage();
    // }
    this.draw(level ? level : 0);
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

  drawMap(
    currentLevel,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    map,
    blockSprite
  ) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let y = 0; y < currentLevel.length; y++) {
      const line = currentLevel[y];
      for (let x = 0; x < line.length; x++) {
        // const element = line[x];
        // if (currentLevel[y][x])
        console.log(currentLevel.length);
        console.log(line.length);

        ctx.drawImage(
          map,
          blockSprite.startX,
          blockSprite.startY,
          blockSprite.width,
          blockSprite.height,
          (x * canvas.width) / (line.length * 2) -
            (y * canvas.height) / (currentLevel.length * 2) +
            canvas.width / 2.1111,
          (y * canvas.height) / (currentLevel.length * 4) +
            (x * canvas.width) / (line.length * 4) +
            canvas.height / 4,
          canvas.width / line.length,
          canvas.height / currentLevel.length
        );
      }
    }
  }

  draw(level: number): void {
    const canvas: HTMLCanvasElement = document.getElementsByClassName(
      'svgCanvas'
    )[0] as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;

    // load images
    const images = { map: new Image() };
    images.map.src = this.skins[0].sprite;
    const currentLevel = this.levels[level];

    if (ctx)
      images.map.onload = () =>
        this.drawMap(currentLevel, canvas, ctx, images.map, this.skins[0]);
  }
}
