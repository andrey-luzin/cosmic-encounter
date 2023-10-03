"use client"; 
import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Planet } from './Planet';
import { CSSDeckIndex } from '@/const/css-consts';

import './index.scss';

type PlayerDeckProps = { index: number };

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = ({ index }) => {
  const deckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.style.setProperty(CSSDeckIndex, String(index));
    }
  }, [index]);

  return(
    <div
      className={cx(
        'player-deck',
        { 'player-deck--current': index === 0 },
      )}
      ref={deckRef}
    >
      {index + 1}
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
