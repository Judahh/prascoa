/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react';
import { Xml, BlocklyDiv } from './styles';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

export class BlocklyComponent extends Component {
  protected blocklyDiv;
  protected toolboxElement;
  protected primaryWorkspace;

  constructor(props) {
    super(props);
    this.blocklyDiv = React.createRef();
    this.toolboxElement = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    const { children, ...rest } = this.props;
    const initialXml = this.props['initialXml'];
    this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current, {
      toolbox: this.toolboxElement.current,
      ...rest,
    });

    if (initialXml) {
      this.xml = initialXml;
    }
  }

  get workspace() {
    return this.primaryWorkspace;
  }

  get xml(): string {
    return Blockly.Xml.workspaceToDom(this.primaryWorkspace).innerHTML;
  }

  set xml(xml: string) {
    Blockly.Xml.domToWorkspace(
      Blockly.Xml.textToDom(xml),
      this.primaryWorkspace
    );
  }

  set toolbox(tree) {
    this.primaryWorkspace.updateToolbox(tree);
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
          ref={this.toolboxElement}
        >
          {children}
        </Xml>
      </>
    );
  }
}
