import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import LanguageContext from '../../language/context';

import Layout from '../Layout';

import { Block } from '../Blockly';
import { BlocklyComponent } from '../Blockly/blocklyComponent';

import '../Blockly/custom';
import Blockly from 'blockly';
import { SvgCanvas } from '../Blockly/styles';
import { Level } from '../../levels/level';

const initialXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml"><block type="start" x="0" y="0"></block></xml>';

const Home = (props) => {
  const lang = useContext(LanguageContext);
  const [simpleWorkspace] = useState({});
  const [minimal, setMinimal] = useState({});
  const [level, setLevel] = useState({});
  useEffect(() => {
    setMinimal(
      Blockly.Theme.defineTheme('minimal', {
        base: 'zelos',
        componentStyles: {
          workspaceBackgroundColour: 'transparent', //'#98eae0',
          flyoutBackgroundColour: '#47baa4',
          flyoutOpacity: 1,
          scrollbarColour: '#797979',
          insertionMarkerColour: '#47baa4',
          insertionMarkerOpacity: 1,
          scrollbarOpacity: 1,
        },
      })
    );
    if (level !== {}) setLevel(new Level(0));
  }, []);

  return (
    <div className="background">
      <Head>
        <title>PRÁSCOA</title>
      </Head>
      <Layout theme={props.theme} language={lang}>
        <BlocklyComponent
          host={props.host}
          ref={simpleWorkspace}
          readOnly={false}
          trashcan={false}
          initialXml={initialXml}
          theme={minimal}
          renderer={'zelos'}
          grid={{
            spacing: 50,
            length: 0,
            snap: true,
            colour: 'transparent',
          }}
        >
          <Block type="forward" />
          <Block type="left" />
          <Block type="right" />
          <Block type="if" />
          <Block type="while" />
          <Block type="block" />
          <Block type="carrot" />
          <Block type="number" />
          <Block type="and" />
          <Block type="or" />
          <Block type="not" />
        </BlocklyComponent>
        <SvgCanvas height="30" width="30" className="svgCanvas"></SvgCanvas>
        {/* <svg className="svgCanvas" xmlns="http://www.w3.org/2000/svg"></svg> */}
      </Layout>
    </div>
  );
};

export default Home;
