"use client"; 
import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Planet } from './Planet';
import { CSSDeckIndex, CSSDeckColor } from '@/const/css-consts';
import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';

type PlayerDeckProps = { index: number } & PlayerType;

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = ({ index, color, name }) => {
  const deckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.style.setProperty(CSSDeckIndex, String(index));
      deckRef.current.style.setProperty(CSSDeckColor, color);
    }
  }, [color, index]);

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
            <Planet key={index} color={color} name={name} />
          );
        })
      }
    </div>
  );
};
