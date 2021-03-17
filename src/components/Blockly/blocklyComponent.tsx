/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react';
import { Xml, BlocklyDiv } from './styles';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

export class BlocklyComponent extends Component {
  blocklyDiv;
  toolbox;
  primaryWorkspace;

  constructor(props) {
    super(props);
    this.blocklyDiv = React.createRef();
    this.toolbox = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { initialXml, children, ...rest } = this.props;
    this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current, {
      toolbox: this.toolbox.current,
      ...rest,
    });

    // @ts-ignore
    if (initialXml) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(initialXml),
        this.primaryWorkspace
      );
    }
  }

  get workspace() {
    return this.primaryWorkspace;
  }

  setXml(xml) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      this.primaryWorkspace
    );
  }

  render() {
    const { children } = this.props;

    return (
      <>
        <BlocklyDiv ref={this.blocklyDiv} id="blocklyDiv" />
        <Xml
          xmlns="https://developers.google.com/blockly/xml"
          is="blockly"
          style={{ display: 'none' }}
          ref={this.toolbox}
        >
          {children}
        </Xml>
      </>
    );
  }
}
