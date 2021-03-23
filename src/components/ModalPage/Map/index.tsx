// file deepcode ignore no-any: any needed
import React, { useEffect, useState } from 'react';
import { Game } from '../../../game/game';
import { ModalPageWrapper } from '../styles';
import { Score, Levels, Level } from './styles';

const Map = (props) => {
  console.log(props);
  const [levels, setLevels] = useState<JSX.Element[]>([]);
  const [score, setScore] = useState<number>(0);
  useEffect(() => {
    setLevels(
      props.getGame instanceof Game
        ? (props.getGame as Game).scores.map((score, level) =>
            level === props.getGame.level ? (
              <Level>current level {score === undefined ? 0 : score}</Level>
            ) : (
              <Level>{score === undefined ? 'lock' : 'level ' + score}</Level>
            )
          )
        : []
    );

    setScore(props.getGame instanceof Game ? (props.getGame as Game).score : 0);
  }, [props.getGame]);

  return (
    <ModalPageWrapper>
      <Score>{score}</Score>
      <Levels>{levels}</Levels>
    </ModalPageWrapper>
  );
};

export default Map;
