/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { default as charSkins } from './characterSkins.json';
import { GameObject } from './gameObject';
import { Position } from './position';
import { Element } from './element';
import { Action } from './action';
import { SharedCanvas } from './sharedCanvas';

// import Blockly from 'blockly';
export class Character extends GameObject {
  protected _code;
  constructor(
    canvas: SharedCanvas,
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin?: number
  ) {
    super(canvas, location, currentLevel, block, skin ? skin : 0, charSkins);
  }

  async execute(code: string): Promise<void> {
    this._code = '(async () => {' + code + '})()';
    await eval(this._code);
  }

  promiseAction(action: Action): Promise<boolean> {
    return new Promise((resolve) => {
      const doTheAction = this.doAction.bind(this);
      const id = setInterval(() => {
        clearInterval(this.idleId);
        const done = doTheAction(action);
        // console.log(done);
        if (done) {
          clearInterval(id);
          this.idleId = setInterval(this.redraw.bind(this), 100);
          resolve(true);
        }
      }, 100);
    });
  }

  doAction(action?: Action): boolean {
    // console.log('DO');
    if (action === Action.Forward)
      switch (this.position) {
        case Position.Left:
          this.x -= this.skins[this.skin].speed;
          break;
        case Position.Right:
          this.x += this.skins[this.skin].speed;
          break;
        case Position.Down:
          this.y -= this.skins[this.skin].speed;
          break;
        case Position.Up:
          this.y += this.skins[this.skin].speed;
          break;
        default:
          break;
      }
    // console.log(Position[this.position]);

    this.redraw(true);

    const xResult = this.getDecimalPart(this.x);
    const yResult = this.getDecimalPart(this.y);

    const done = xResult == 0 && yResult == 0;

    if (done) {
      this.x = Math.floor(this.x);
      this.y = Math.floor(this.y);
    }

    //! TODO: TURN
    return done;
  }

  async action(action: Action): Promise<void> {
    console.log('ACTION:', action);

    console.log(this.x, this.y);
    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] - Element.Char * this.position;
    if (action === Action.Forward) {
      // console.log('PLAY: actionSound');
      this.play('actionSound');
    }
    await this.promiseAction(action);
    console.log(this.x, this.y);
    this.currentLevel[this.y][this.x] =
      this.currentLevel[this.y][this.x] + Element.Char * this.position;
  }

  is(element: Element): boolean {
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
