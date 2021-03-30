// file deepcode ignore no-any: any needed
import React, { useEffect, useState } from 'react';
import { Game } from '../../../game/game';
import { ModalPageWrapper } from '../styles';
import { Score, Levels, Level, Rabbit, Box } from './styles';
import { FaLock } from 'react-icons/fa';

const Map = (props) => {
  // console.log(props);
  const [levels, setLevels] = useState<JSX.Element[]>([]);
  const [score, setScore] = useState<number>(0);
  const [currentLevel, setCurrentLevel] = useState<number>(0);
  useEffect(() => {
    console.log('CURRENT LEVEL');
    let realCurrentLevel = currentLevel;
    if (
      (props.getGame as Game) &&
      currentLevel !== (props.getGame as Game).level &&
      (props.getGame as Game).level !== undefined &&
      (props.getGame as Game).level !== null &&
      !Number.isNaN((props.getGame as Game).level)
    ) {
      setCurrentLevel((props.getGame as Game).level);
      realCurrentLevel = (props.getGame as Game).level;
    }
    setLevels(
      props.getGame instanceof Game
        ? (props.getGame as Game).scores.map((score, level) =>
            level === realCurrentLevel ? (
              <Level key={level}>
                <Rabbit src="/rabbit.svg" alt="V" />
                <Box>
                  {score === undefined || score === null
                    ? 0
                    : Math.round(score)}
                </Box>
              </Level>
            ) : (
              <Level
                key={level}
                style={{
                  cursor:
                    score === undefined || score === null
                      ? 'default'
                      : 'pointer',
                }}
                onClick={() => {
                  if (score !== undefined && score !== null) {
                    (props.getGame as Game).level = level;
                    setCurrentLevel(level);
                  }
                }}
              >
                {score === undefined || score === null ? (
                  <>
                    <div
                      style={{
                        height: '70px',
                        width: '100%',
                        display: 'block',
                        padding: '10px',
                      }}
                    />
                    <FaLock
                      style={{
                        height: '55px',
                        width: '25px',
                        margin: '0px 10px',
                        color: 'red',
                        display: 'block',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </>
                ) : (
                  <>
                    <div
                      style={{
                        height: '70px',
                        width: '100%',
                        display: 'block',
                        padding: '10px',
                      }}
                    />
                    <Box>
                      {score === undefined || score === null
                        ? 0
                        : Math.round(score)}
                    </Box>
                  </>
                )}
              </Level>
            )
          )
        : []
    );
  }, [currentLevel, (props.getGame as Game).scores]);

  useEffect(() => {
    setScore(
      props.getGame instanceof Game
        ? Math.round((props.getGame as Game).score)
        : 0
    );
  }, [(props.getGame as Game).score]);

  useEffect(() => {
    setScore(
      props.getGame instanceof Game
        ? Math.round((props.getGame as Game).score)
        : 0
    );
  }, [(props.getGame as Game).score]);

  useEffect(() => {
    if (
      (props.getGame as Game) &&
      (props.getGame as Game).level !== undefined &&
      (props.getGame as Game).level !== null &&
      !Number.isNaN((props.getGame as Game).level)
    ) {
      setCurrentLevel((props.getGame as Game).level);
    }
  }, [(props.getGame as Game).level]);

  useEffect(() => {
    console.log('GAME:');
    let realCurrentLevel = 0;
    if (
      (props.getGame as Game) &&
      currentLevel !== (props.getGame as Game).level &&
      (props.getGame as Game).level !== undefined &&
      (props.getGame as Game).level !== null &&
      !Number.isNaN((props.getGame as Game).level)
    ) {
      realCurrentLevel = (props.getGame as Game).level;
    }
    setCurrentLevel(realCurrentLevel);
  }, [props.getGame as Game, props.getPlay]);

  return (
    <ModalPageWrapper>
      <Score>{score}</Score>
      <Levels>{levels}</Levels>
    </ModalPageWrapper>
  );
};

export default Map;
