// file deepcode ignore no-any: any needed
/* eslint-disable @typescript-eslint/no-explicit-any */
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
  Background3,
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
  const [score, setScore] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);

  setInterval(() => {
    const newScore = Math.round((game as Game).currentScore);
    if (!Number.isNaN(newScore) && newScore !== score) setScore(newScore);
    const newLevel = Math.round((game as Game).level);

    if (!Number.isNaN(newLevel) && newLevel !== level) {
      setLevel(Math.round((game as Game).level));
      // console.log('NL:', level);
    }
  }, 200);

  useEffect(() => {
    const newScore = Math.round((game as Game).currentScore);
    if (!Number.isNaN(newScore) && newScore !== score)
      setScore(Math.round((game as Game).currentScore));
    const newLevel = Math.round((game as Game).level);
    if (!Number.isNaN(newLevel) && newLevel !== level)
      setLevel(Math.round((game as Game).level));
  }, [
    game,
    (game as Game).currentScore,
    (game as Game).score,
    (game as Game).level,
  ]);

  useEffect(() => {
    console.log('FL:', level);
    const newLevel = Math.round((game as Game).level);
    if (!Number.isNaN(newLevel) && newLevel !== level) setLevel(newLevel);
  }, [score]);

  useEffect(() => {
    if (game instanceof Game) {
      setPlay(document.querySelectorAll('[data-id="blockStart"]')[0]);
    }
  }, [game]);

  useEffect(() => {
    (play as HTMLElement).onclick = async () => {
      await (game as Game).play.bind(game)(
        simpleWorkspace.current.primaryWorkspace
      );
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
            <Score>{game instanceof Game ? score : 0}</Score>
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
              <Block type="while" />
              <Block type="number" />

              {level >= 2 ? <Block type="left" /> : undefined}
              {level >= 2 ? <Block type="right" /> : undefined}
              {level >= 4 ? <Block type="if" /> : undefined}
              {level >= 6 ? <Block type="while" /> : undefined}
              {level >= 5 ? <Block type="block" /> : undefined}
              {level >= 4 ? <Block type="carrot" /> : undefined}
              {level >= 6 ? <Block type="number" /> : undefined}
              {level >= 5 ? <Block type="and" /> : undefined}
              {level >= 5 ? <Block type="or" /> : undefined}
              {level >= 5 ? <Block type="not" /> : undefined}
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
        <Background3 theme={props.theme} />
      </Layout>
    </>
  );
};

export default Home;
