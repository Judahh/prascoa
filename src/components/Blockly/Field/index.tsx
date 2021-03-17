import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Blockly, { Field, DropDownDiv } from 'blockly/core';

class BlocklyField extends Field {
  div_: any;
  static fromJson(options) {
    return new BlocklyField(options['text']);
  }

  showEditor_() {
    this.div_ = DropDownDiv.getContentDiv();
    ReactDOM.render(this.render(), this.div_);

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    let border = this.sourceBlock_.getColourBorder();
    border = border.colourBorder || border.colourLight;
    DropDownDiv.setColour(this.sourceBlock_.getColour(), border);

    DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
  }

  dropdownDispose_() {
    ReactDOM.unmountComponentAtNode(this.div_);
  }

  render() {
    return <FieldRenderComponent />;
  }
}

class FieldRenderComponent extends Component {
  render() {
    return <div style={{ color: '#fff' }}>Hello from React!</div>;
  }
}

Blockly.fieldRegistry.register('field_component', BlocklyField);

export default BlocklyField;
