"use client"; 
import React, { FC, useEffect } from 'react';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';

import './index.scss';

type DashboardProps = unknown;

const countsOfPlayers = 5;
// https://jsfiddle.net/rtcC8/88/
export const Dashboard: FC<DashboardProps> = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(CSSDecksCount, String(countsOfPlayers));
  }, []);
  return(
    <div className={`dashboard dashboard--total-count-${countsOfPlayers}`}>
      {[...Array(countsOfPlayers)].map((_, index) => {
        return <PlayerDeck index={index} key={index} />;
      })}
    </div>
  );
};
