"use client"; 
import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { Planet } from './Planet';
import { CSSDeckIndex, CSSDeckColor } from '@/const/css-consts';
import { PlayerColor } from '@/types/PlayerTypes';
import Image from 'next/image';

import './index.scss';

type PlayerDeckProps = { index: number, color: PlayerColor };

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = ({ index, color }) => {
  const deckRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (deckRef.current) {
      deckRef.current.style.setProperty(CSSDeckIndex, String(index));
      deckRef.current.style.setProperty(CSSDeckColor, color);
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
