import Blockly from 'blockly';
class CustomConstantsProvider extends Blockly.zelos.ConstantProvider {
  constructor() {
    // Set up all of the constants from the base provider.
    super();

    this.TAB_WIDTH = 1;
    this.GRID_UNIT = 4;
    // this.MIN_BLOCK_WIDTH = 12;
    // this.EMPTY_BLOCK_SPACER_WIDTH = 1;
    this.STATEMENT_INPUT_SPACER_MIN_WIDTH = 2 * this.GRID_UNIT;
    this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH = 2 * this.GRID_UNIT;
  }
}

Blockly.zelos.ConstantProvider = CustomConstantsProvider;
