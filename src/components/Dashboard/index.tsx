import React, { FC } from 'react';

import { PlayerDeck } from '@/components/PlayerDeck';

import './index.scss';

type DashboardProps = unknown;

const countsOfPlayers = 1;
// https://jsfiddle.net/rtcC8/88/
export const Dashboard: FC<DashboardProps> = () => {
  return(
    <div className="dashboard">
      {[...Array(countsOfPlayers)].map((_, index) => <PlayerDeck key={index} />)}
    </div>
  );
};
