import React, { FC } from 'react';

import './index.scss';
import { Planet } from './Planet';

type PlayerDeckProps = unknown;

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = () => {
  return(
    <div className="player-deck">
      {
        [...Array(countOfPlanets)].map((_, index) => {
          return(
            <Planet key={index} />
          );
        })
      }
    </div>
  );
};
