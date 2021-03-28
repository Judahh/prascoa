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
  protected _code;
  protected gotItem;
  protected _steps;
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    gotItem,
    skin?: number
  ) {
    super(canvas, location, currentLevel, block, skin ? skin : 0, charSkins);
    this.gotItem = gotItem;
    this._steps = 0;
  }

  async execute(code: string): Promise<void> {
    this._code = '(async () => {' + code + '})()';
    console.log(code);
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
    console.log('DOING');

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
      await this.redraw(true, true);

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
      await this.redraw(false, true);
    }
    // console.log('ACTION:', this.x, this.y);

    return done;
  }

  async action(action: Action): Promise<void> {
    console.log('NEW ACTION:', action);
    if (this.x === undefined || this.y === undefined) {
      this.x = undefined;
      this.y = undefined;
      throw new Error('Died');
    }

    console.log('WITH:', this.x, this.y);
    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] - Element.Char * this.position;
    if (action === Action.Forward) {
      // console.log('PLAY: actionSound');
      this.play('actionSound');
    }
    await this.promiseAction(action);
    console.log('promiseAction END');

    if (
      this.y >= this.currentLevel.length ||
      this.x >= this.currentLevel[this.y].length
    ) {
      this.x = undefined;
      this.y = undefined;
      throw new Error('Died');
    }
    this._steps++;
    console.log(this.x, this.y);
    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] + Element.Char * this.position;

    if (getItem(this.currentLevel[this.y][this.x])) {
      await this.gotItem(this.x, this.y, this._steps);
    }
    // return true;
  }

  is(element: Element): boolean {
    if (this.x === undefined || this.y === undefined) return false;
    switch (this.position) {
      case Position.Down:
        return this.currentLevel[this.y + 1][this.x] >= element;
      case Position.up:
        return this.currentLevel[this.y - 1][this.x] >= element;
      case Position.Right:
        return this.currentLevel[this.y][this.x + 1] >= element;
      case Position.Left:
        return this.currentLevel[this.y][this.x - 1] >= element;
      default:
        return this.currentLevel[this.y][this.x] >= element;
    }
  }

  not(action): boolean {
    return !action;
  }

  check(action) {
    return action;
  }

  and(action1, action2) {
    return action1 * action2;
  }

  or(action1, action2) {
    return action1 + action2;
  }
}
