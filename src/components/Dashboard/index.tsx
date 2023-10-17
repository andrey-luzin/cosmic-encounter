"use client"; 
import React, { FC, useEffect } from 'react';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';
import { Warp } from '../Warp';

import { PlayerColor, PlayerType } from '@/types/PlayerTypes';

import './index.scss';
import { RoundProgress } from '../RoundProgress';

type DashboardProps = unknown;

const players: PlayerType[] = [
  {
    playerName: "1",
    color: PlayerColor.Blue
  },
  {
    playerName: "1",
    color: PlayerColor.Yellow
  },
  {
    playerName: "1",
    color: PlayerColor.Red
  },
  {
    playerName: "1",
    color: PlayerColor.Purple
  },
  // {
  //   playerName: "1",
  //   color: PlayerColor.Green
  // },
];

export const Dashboard: FC<DashboardProps> = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(CSSDecksCount, String(players.length));
  }, []);

  return(
    <div className="dashboard">
      <RoundProgress />
      <div className={`dashboard__deck dashboard__deck--total-count-${players.length}`}>
        {players.map((player, index) => {
          return <PlayerDeck index={index} key={index} color={player.color} playerName={player.playerName} />;
        })}
        <Warp />
      </div>
    </div>
  );
};
