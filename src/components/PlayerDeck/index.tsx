"use client"; 
import React, { FC, useEffect } from 'react';
import { Planet } from './Planet';
import { CSSItemsCount } from '@/const/css-consts';

import './index.scss';

type PlayerDeckProps = unknown;

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(CSSItemsCount, String(countOfPlanets));
  }, []);

  return(
    <div className="player-deck">
      {
        [...Array(countOfPlanets)].map((_, index) => {
          return(
            <Planet index={index} key={index} />
          );
        })
      }
    </div>
  );
};
