/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React, { Component } from 'react';
import { Xml, BlocklyDiv } from './styles';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/en';
import 'blockly/blocks';

Blockly.setLocale(locale);

export class BlocklyComponent extends Component {
  protected blocklyDiv: React.RefObject<string | HTMLElement>;
  protected toolboxElement: React.RefObject<HTMLElement>;
  protected primaryWorkspace?: Blockly.WorkspaceSvg;

  constructor(props) {
    super(props);
    this.blocklyDiv = React.createRef();
    this.toolboxElement = React.createRef();
  }

  componentDidMount() {
    // eslint-disable-next-line no-unused-vars
    // console.log('MOUNT');
    // eslint-disable-next-line no-unused-vars
    const { children, ...rest } = this.props;
    const initialXml = this.props['initialXml'];
    if (this.blocklyDiv.current)
      this.primaryWorkspace = Blockly.inject(this.blocklyDiv.current, {
        toolbox: this.toolboxElement.current
          ? this.toolboxElement.current
          : undefined,
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
    if (this.primaryWorkspace)
      return Blockly.Xml.workspaceToDom(this.primaryWorkspace).innerHTML;
    return '';
  }

  set xml(xml: string) {
    if (this.primaryWorkspace)
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(xml),
        this.primaryWorkspace
      );
  }

  set toolbox(tree) {
    if (this.primaryWorkspace) {
      // console.log('TOOLBOX UPDATE:', tree);
      this.primaryWorkspace.updateToolbox(tree);
    }
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
