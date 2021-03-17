import Blockly from 'blockly';
import './renderers/constants';

Blockly.Blocks['start'] = {
  init: function () {
    this.setMovable(false);
    this.setDeletable(false);
    this.appendDummyInput().appendField('       ▶      ');
    this.setColour('#4285F4');
    this.appendStatementInput('Content').setCheck(null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['while'] = {
  init: function () {
    this.appendValueInput('NAME').appendField(
      new Blockly.FieldLabel('⟳', 'blockType1')
    );
    this.appendStatementInput('Content').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour('#FBBC05');
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['if'] = {
  init: function () {
    this.appendValueInput('NAME').appendField(
      new Blockly.FieldLabel(' ⇒', 'blockType2')
    );
    this.appendStatementInput('Content').setCheck(null);
    this.setPreviousStatement(true, null);
    this.setColour('#FBBC05');
    this.setNextStatement(true, null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['and'] = {
  init: function () {
    this.appendValueInput('ContentA');
    this.appendDummyInput().appendField('✖️ ');
    this.appendValueInput('ContentB');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['or'] = {
  init: function () {
    this.appendValueInput('ContentA');
    this.appendDummyInput().appendField('➕ ');
    this.appendValueInput('ContentB');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['not'] = {
  init: function () {
    this.appendDummyInput().appendField('🚫 ');
    this.appendValueInput('ContentA');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
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

Blockly.Blocks['block'] = {
  init: function () {
    this.appendDummyInput().appendField('🧱');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
};

Blockly.Blocks['carrot'] = {
  init: function () {
    this.appendDummyInput().appendField('🥕');
    this.setColour('#FFF');
    this.setOutput(true, null);
    this.setInputsInline(true);
  },
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
