import './renderers/constants';

import Blockly from 'blockly';

import { Action } from '../../../game/action';
import { Element } from '../../../game/element';

// Blockly.WidgetDiv.createDom = () => {
//   if (Blockly.WidgetDiv.DIV) {
//     console.log('A');
//     return; // Already created.
//   }
//   console.log('B');
// };
// eslint-disable-next-line no-unused-vars
Blockly.Workspace.prototype.undo = (redo) => {
  // var inputStack = redo ? this.redoStack_ : this.undoStack_;
  // var outputStack = redo ? this.undoStack_ : this.redoStack_;
  // var event = inputStack.pop();
  // if (!event) {
  //   return;
  // }
  // var events = [event];
  // // Do another undo/redo if the next one is of the same group.
  // while (inputStack.length && event.group &&
  //     event.group == inputStack[inputStack.length - 1].group) {
  //   events.push(inputStack.pop());
  // }
  // // Push these popped events on the opposite stack.
  // for (var i = 0, event; event = events[i]; i++) {
  //   outputStack.push(event);
  // }
  // events = Blockly.Events.filter(events, redo);
  // Blockly.Events.recordUndo = false;
  // // BROKEN
  // // for (var i = 0, event; event = events[i]; i++) {
  // //   event.run(redo);
  // // }
  // // FIXED
  // for (var i = events.length - 1; i >= 0; i--) {
  //   events[i].run(redo);
  // }
  // Blockly.Events.recordUndo = true;
};

Blockly.Blocks['start'] = {
  init: function () {
    this.setMovable(false);
    this.setDeletable(false);
    this.appendDummyInput().appendField('       ▶      ');
    this.setColour('#4285F4');
    this.appendStatementInput('Content').setCheck(null);
    this.setInputsInline(true);
    // this.event;
  },
};

Blockly.JavaScript['start'] = (block) => {
  var branch = Blockly.JavaScript.statementToCode(block, 'Content');
  return branch;
};

Blockly.Blocks['while'] = {
  init: function () {
    this.appendValueInput('VALUE').appendField(
      new Blockly.FieldLabel('⟳', 'blockType1')
    );
    this.appendStatementInput('Content').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour('#FBBC05');
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['while'] = (block) => {
  var field = Blockly.JavaScript.valueToCode(
    block,
    'VALUE',
    Blockly.JavaScript.ORDER_ATOMIC
  );

  var branch = Blockly.JavaScript.statementToCode(block, 'Content');
  return (
    'for(let i = 0; i<this.check(' + field + '); i++) {\n' + branch + '}\n'
  );
};

Blockly.Blocks['if'] = {
  init: function () {
    this.appendValueInput('VALUE').appendField(
      new Blockly.FieldLabel(' ⇒', 'blockType2')
    );
    this.appendStatementInput('Content').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour('#FBBC05');
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['if'] = (block) => {
  var field = Blockly.JavaScript.valueToCode(
    block,
    'VALUE',
    Blockly.JavaScript.ORDER_ATOMIC
  );

  var branch = Blockly.JavaScript.statementToCode(block, 'Content');
  return block.type + ' (this.check(' + field + ')) {\n' + branch + '}\n';
};

Blockly.Blocks['and'] = {
  init: function () {
    this.appendValueInput('VALUEA');
    this.appendDummyInput().appendField('✖️');
    this.appendValueInput('VALUEB');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['and'] = (block) => {
  var fielda = Blockly.JavaScript.valueToCode(
    block,
    'VALUEA',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var fieldb = Blockly.JavaScript.valueToCode(
    block,
    'VALUEB',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return [
    'this.and(' + fielda + ',' + fieldb + ')',
    Blockly.JavaScript.ORDER_NONE,
  ];
};

Blockly.Blocks['or'] = {
  init: function () {
    this.appendValueInput('VALUEA');
    this.appendDummyInput().appendField('➕');
    this.appendValueInput('VALUEB');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['or'] = (block) => {
  var fielda = Blockly.JavaScript.valueToCode(
    block,
    'VALUEA',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  var fieldb = Blockly.JavaScript.valueToCode(
    block,
    'VALUEB',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return [
    'this.or(' + fielda + ',' + fieldb + ')',
    Blockly.JavaScript.ORDER_NONE,
  ];
};

Blockly.Blocks['not'] = {
  init: function () {
    this.appendDummyInput().appendField('🚫 ');
    this.appendValueInput('VALUE');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['not'] = (block) => {
  var field = Blockly.JavaScript.valueToCode(
    block,
    'VALUE',
    Blockly.JavaScript.ORDER_ATOMIC
  );
  return ['this.not(' + field + ')', Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['number'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldNumber(5, 0, 1000, 1),
      'number'
    );
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};
Blockly.JavaScript['number'] = (block) => {
  var field = block.getFieldValue('number');
  return [field, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Blocks['block'] = {
  init: function () {
    this.appendDummyInput().appendField('🧱');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};
Blockly.JavaScript['block'] = (block) => {
  return [
    'this.is(' + Element[block.type] + ')',
    Blockly.JavaScript.ORDER_NONE,
  ];
};

Blockly.Blocks['carrot'] = {
  init: function () {
    this.appendDummyInput().appendField('🥕');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['carrot'] = (block) => {
  return [
    'this.is(' + Element[block.type] + ')',
    Blockly.JavaScript.ORDER_NONE,
  ];
};

Blockly.Blocks['forward'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabel('  ➟', 'blockType2')
    );
    this.setColour('#34A853');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['forward'] = (block) => {
  return 'await this.action(' + Action[block.type] + ');\n';
};

Blockly.Blocks['left'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabel(' ↺', 'blockType1')
    );
    this.setColour('#34A853');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['left'] = (block) => {
  return 'await this.action(' + Action[block.type] + ');\n';
};

Blockly.Blocks['right'] = {
  init: function () {
    this.appendDummyInput().appendField(
      new Blockly.FieldLabel(' ↻', 'blockType1')
    );
    this.setColour('#34A853');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.JavaScript['right'] = (block) => {
  return 'await this.action(' + Action[block.type] + ');\n';
};
