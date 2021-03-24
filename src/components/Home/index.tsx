import React, { useEffect, useContext, useState } from 'react';
import Head from 'next/head';
import LanguageContext from '../../language/context';

import Layout from '../Layout';

import { Block } from '../Blockly';
import { BlocklyComponent } from '../Blockly/blocklyComponent';

import '../Blockly/custom';
// import Blockly from 'blockly';
import { Game } from '../../game/game';
import {
  Background,
  Play,
  Text,
  Score,
  SvgCanvas,
  SvgCanvas2,
  Background2,
} from './styles';

const initialXml =
  '<xml xmlns="http://www.w3.org/1999/xhtml"><block deletable="false" movable="false" id="blockStart" type="start" x="0" y="0"></block></xml>';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Home = (props) => {
  // console.log('Home:', props);
  const lang = useContext(LanguageContext);
  const [simpleWorkspace] = useState<any>({});
  const [play, setPlay] = useState({});
  const [game, setGame] = useState({});

  useEffect(() => {
    if (game instanceof Game) {
      setPlay(document.querySelectorAll('[data-id="blockStart"]')[0]);
    }
  }, [game]);

  useEffect(() => {
    (play as HTMLElement).onclick = () => {
      (game as Game).play.bind(game)(simpleWorkspace.current.primaryWorkspace);
    };
  }, [play]);

  return (
    <>
      <Head>
        <title>PRÁSCOA</title>
      </Head>
      <Layout
        setGame={setGame}
        getGame={game}
        theme={props.theme}
        language={lang}
      >
        {game instanceof Game ? (
          <>
            <Score>{game instanceof Game ? game.currentScore : 0}</Score>
            <BlocklyComponent
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
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
          </>
        ) : (
          <Play
            onClick={() => {
              if (setGame && !(game instanceof Game)) {
                setGame(new Game());
              }
            }}
          >
            <Text>▶</Text>
          </Play>
        )}

        <Background theme={props.theme}>
          <SvgCanvas className="svgCanvas"></SvgCanvas>
        </Background>
        <Background2 theme={props.theme}>
          <SvgCanvas2 className="svgCanvas2"></SvgCanvas2>
        </Background2>
        <Background2 theme={props.theme}>
          <SvgCanvas2 className="svgCanvas3"></SvgCanvas2>
        </Background2>
      </Layout>
    </>
  );
};

export default Home;
