import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import LanguageContext from '../../language/context';

import Layout from '../Layout';

import { Block } from '../Blockly';
import { BlocklyComponent } from '../Blockly/blocklyComponent';

import '../Blockly/custom';
import Blockly from 'blockly';
import { Game } from '../../game/game';
import { Background, SvgCanvas } from './styles';
import { Audio } from '../../game/audio';

const initialXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml"><block deletable="false" movable="false" id="blockStart" type="start" x="0" y="0"></block></xml>';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = (props) => {
  const lang = useContext(LanguageContext);
  const [simpleWorkspace] = useState({});
  const [play, setPlay] = useState({});
  const [level, setLevel] = useState(0);
  const [game, setGame] = useState({});
  const [audio, setAudio] = useState({});

  useEffect(() => {
    if (game instanceof Game) game.setLevel(level);
  }, [level]);

  useEffect(() => {
    if (audio instanceof Audio && !(game instanceof Game)) {
      setGame(new Game());
    }
  }, [audio]);

  useEffect(() => {
    if (game instanceof Game) {
      setPlay(document.querySelectorAll('[data-id="blockStart"]')[0]);
    }
  }, [game]);

  useEffect(() => {
    (play as HTMLElement).onclick = () => {
      (audio as Audio).play.bind(audio)();
      (game as Game).play.bind(game)(simpleWorkspace.current.primaryWorkspace);
    };
  }, [play]);

  useEffect(() => {
    if (!(audio instanceof Audio)) {
      setAudio(new Audio());
    }
  }, []);

  return (
    <>
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
        <Background theme={props.theme}>
          <SvgCanvas className="svgCanvas"></SvgCanvas>
        </Background>
      </Layout>
    </>
  );
};

export default Home;
