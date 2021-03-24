/**
 * Go to the next level.  Add skin parameter.
 * @suppress {duplicate}
 */

import { default as charSkins } from './characterSkins.json';
import { GameObject } from './gameObject';
import { Position } from './position';

// import Blockly from 'blockly';
export class Character extends GameObject {
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

  execute(code: string): void {
    eval(code);
  }

  action(action): void {
    console.log('ACTION:', action);
  }

  is(action) {
    switch (this.position) {
      case Position.Down:
        return this.currentLevel[this.y + 1][this.x] >= action;
      case Position.up:
        return this.currentLevel[this.y - 1][this.x] >= action;
      case Position.Right:
        return this.currentLevel[this.y][this.x + 1] >= action;
      case Position.Left:
        return this.currentLevel[this.y][this.x - 1] >= action;
      default:
        return this.currentLevel[this.y][this.x] >= action;
    }
  }

  not(action) {
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
