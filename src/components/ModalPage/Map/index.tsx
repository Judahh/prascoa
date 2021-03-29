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
    setLevels(
      props.getGame instanceof Game
        ? (props.getGame as Game).scores.map((score, level) =>
            level === currentLevel ? (
              <Level key={level}>
                <Rabbit src="/rabbit.svg" alt="V" />
                <Box>{score === undefined ? 0 : Math.round(score)}</Box>
              </Level>
            ) : (
              <Level
                key={level}
                style={{
                  cursor: score === undefined ? 'default' : 'pointer',
                }}
                onClick={() => {
                  if (score !== undefined) {
                    (props.getGame as Game).level = level;
                    setCurrentLevel(level);
                  }
                }}
              >
                {score === undefined ? (
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
                    <Box>{score === undefined ? 0 : Math.round(score)}</Box>
                  </>
                )}
              </Level>
            )
          )
        : []
    );
  }, [currentLevel]);

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
      (props.getGame as Game).level !== undefined
    ) {
      setCurrentLevel((props.getGame as Game).level);
    }
  }, [(props.getGame as Game).level]);

  return (
    <ModalPageWrapper>
      <Score>{score}</Score>
      <Levels>{levels}</Levels>
    </ModalPageWrapper>
  );
};

export default Map;
