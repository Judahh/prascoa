/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { default as charSkins } from './characterSkins.json';
import { GameObject } from './gameObject';
import { Position } from './position';
import { Element, getItem } from './element';
import { Action } from './action';
import { SharedCanvas } from './sharedCanvas';

// import Blockly from 'blockly';
export class Character extends GameObject {
  protected _code: string;
  // eslint-disable-next-line no-unused-vars
  protected gotItem: (x: number, y: number, steps: number) => Promise<void>;
  protected _steps: number;
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    // eslint-disable-next-line no-unused-vars
    gotItem: (x: number, y: number, steps: number) => Promise<void>,
    skin?: number
  ) {
    super(canvas, location, currentLevel, block, skin ? skin : 0, charSkins);
    this.gotItem = gotItem;
    this._steps = 0;
    this._code = '(async () => {})()';
  }

  async execute(code: string): Promise<void> {
    this._code = '(async () => {' + code + '})()';
    // console.log(code);
    await eval(this._code);
  }

  promiseAction(action: Action): Promise<boolean> {
    const doTheAction = this.doAction.bind(this);
    return new Promise(async (resolve) => {
      let done = await doTheAction(action);
      if (done) resolve(done);
      else {
        done = await this.promiseAction(action);
        resolve(done);
      }
    });
  }

  async doAction(action?: Action): Promise<boolean> {
    try {
      // console.log('DOING');

      let done = true;
      if (this.x === undefined || this.y === undefined) return done;
      // console.log('P:', this.x, this.y);
      if (action === Action.Forward) {
        switch (this.position) {
          case Position.Left:
            this.x -= this.skins[this.skin].speed;
            break;
          case Position.Right:
            this.x += this.skins[this.skin].speed;
            break;
          case Position.Down:
            this.y += this.skins[this.skin].speed;
            break;
          case Position.Up:
            this.y -= this.skins[this.skin].speed;
            break;
          default:
            break;
        }
        await this.draw(true, true);

        this.x = Number(this.x.toFixed(1));
        this.y = Number(this.y.toFixed(1));

        const xResult = this.x % 1;
        const yResult = this.y % 1;

        done = xResult === 0 && yResult === 0;

        if (done) {
          this.x = Math.trunc(this.x);
          this.y = Math.trunc(this.y);
        }

        // console.log('EP:', this.x, this.y);
        // console.log('EPD:', done);
      } else if (action) {
        const isLeft = action === 1;
        switch (this.position) {
          case Position.Left:
            if (isLeft) this.position = Position.Down;
            else this.position = Position.Up;
            break;
          case Position.Right:
            if (isLeft) this.position = Position.Up;
            else this.position = Position.Down;
            break;
          case Position.Down:
            if (isLeft) this.position = Position.Right;
            else this.position = Position.Left;
            break;
          case Position.Up:
            if (isLeft) this.position = Position.Left;
            else this.position = Position.Right;
            break;
          default:
            break;
        }
        // console.log('turn');
        await this.draw(false, true);
      }
      // console.log('ACTION:', this.x, this.y);

      return done;
    } catch (error) {
      this.x = undefined;
      this.y = undefined;
      return true;
    }
  }

  async action(action: Action): Promise<void> {
    // console.log('NEW ACTION:', action);
    if (this.x === undefined || this.y === undefined) {
      this.x = undefined;
      this.y = undefined;
      throw new Error('Died');
    }

    // console.log('WITH:', this.x, this.y);
    // console.log('enter:', this.currentLevel[this.y][this.x]);
    let char = Element.Char + this.position * 10;
    // console.log('char:', char);

    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] - char;
    // console.log('left:', this.currentLevel[this.y][this.x]);
    if (action === Action.Forward) {
      // console.log('PLAY: actionSound');
      this.play('actionSound');
    }
    await this.promiseAction(action);
    // console.log('promiseAction END');

    if (
      this.y >= this.currentLevel.length ||
      this.x >= this.currentLevel[this.y].length ||
      this.y < 0 ||
      this.x < 0 ||
      !this.hasBlock()
    ) {
      this.x = undefined;
      this.y = undefined;
      throw new Error('Died');
    }
    this._steps++;
    // console.log('TO:', this.x, this.y);
    // console.log('before enter:', this.currentLevel[this.y][this.x]);
    char = Element.Char + this.position * 10;
    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] + char;
    // console.log('enter:', this.currentLevel[this.y][this.x]);

    if (getItem(this.currentLevel[this.y][this.x])) {
      await this.gotItem(this.x, this.y, this._steps);
    }
    // return true;
  }

  hasBlock(): boolean {
    if (
      this.x === undefined ||
      this.y === undefined ||
      this.currentLevel[this.y] === undefined ||
      this.currentLevel[this.y][this.x] === undefined
    )
      return false;
    return this.currentLevel[this.y][this.x] >= Element.block;
  }

  is(element: Element): boolean {
    // console.log(' is:', element);
    if (this.x === undefined || this.y === undefined) return false;
    switch (this.position) {
      case Position.Down:
        if (
          this.currentLevel[this.y + 1] === undefined ||
          this.currentLevel[this.y + 1][this.x] === undefined
        )
          return false;
        // console.log(this.currentLevel[this.y + 1][this.x]);

        return this.currentLevel[this.y + 1][this.x] >= element;
      case Position.up:
        if (
          this.currentLevel[this.y - 1] === undefined ||
          this.currentLevel[this.y - 1][this.x] === undefined
        )
          return false;
        // console.log(this.currentLevel[this.y - 1][this.x]);

        return this.currentLevel[this.y - 1][this.x] >= element;
      case Position.Right:
        if (
          this.currentLevel[this.y] === undefined ||
          this.currentLevel[this.y][this.x + 1] === undefined
        )
          return false;
        // console.log(this.currentLevel[this.y][this.x + 1]);

        return this.currentLevel[this.y][this.x + 1] >= element;
      case Position.Left:
        if (
          this.currentLevel[this.y] === undefined ||
          this.currentLevel[this.y][this.x - 1] === undefined
        )
          return false;
        // console.log(this.currentLevel[this.y][this.x - 1]);

        return this.currentLevel[this.y][this.x - 1] >= element;
      default:
        if (
          this.currentLevel[this.y] === undefined ||
          this.currentLevel[this.y][this.x] === undefined
        )
          return false;
        // console.log(this.currentLevel[this.y][this.x]);

        return this.currentLevel[this.y][this.x] >= element;
    }
  }

  not(action: unknown): boolean {
    // console.log('NOT:', action);
    return !action;
  }

  check(action: number | boolean, index?: number): boolean {
    if (typeof action === 'boolean') return action;
    if (index !== undefined) return action > index;
    else return action > 0;
  }

  and(action1: number | boolean, action2: number | boolean): number | boolean {
    if (typeof action1 === 'boolean' && typeof action2 === 'boolean')
      return action1 && action2;
    if (typeof action1 === 'boolean') action1 = action1 ? 1 : 0;
    if (typeof action2 === 'boolean') action2 = action2 ? 1 : 0;
    return action1 * action2;
  }

  or(action1: number | boolean, action2: number | boolean): number | boolean {
    if (typeof action1 === 'boolean' && typeof action2 === 'boolean')
      return action1 || action2;
    if (typeof action1 === 'boolean') action1 = action1 ? 1 : 0;
    if (typeof action2 === 'boolean') action2 = action2 ? 1 : 0;
    return action1 + action2;
  }

  async fall(): Promise<void> {
    this.play('crashSound');
    for (let index = 0; index < 10; index++) {
      await this.canvas.addDrawing(
        this.canvasIndex,
        this.skins[this.skin].crashSprite,
        this.skins[this.skin].crash.startX,
        this.skins[this.skin].crash.startY,
        this.skins[this.skin].crash.width,
        this.skins[this.skin].crash.height,
        this.canvas.width / 2,
        (index * this.canvas.height) / 5,
        this.canvas.width / 5,
        this.canvas.height / 5
      );
    }
  }
}
