/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { default as charSkins } from './characterSkins.json';
import { GameObject } from './gameObject';
import { Position } from './position';
import { Element } from './element';
import { Action } from './action';

// import Blockly from 'blockly';
export class Character extends GameObject {
  protected _code;
  constructor(
    location: { x: number; y: number; position: Position },
    currentLevel: number[][],
    block: { height: number; width: number },
    skin?: number
  ) {
    super(
      location,
      currentLevel,
      block,
      skin ? skin : 0,
      'svgCanvas2',
      charSkins
    );
    this.draw();
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
          this.idleId = setInterval(this.draw.bind(this), 100);
          resolve(true);
        }
      }, 100);
    });
  }

  async action(action: Action): Promise<void> {
    console.log('ACTION:', action);

    if (action === Action.Forward) {
      console.log('PLAY: actionSound');
      this.play('actionSound');
    }
    await this.promiseAction(action);
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
