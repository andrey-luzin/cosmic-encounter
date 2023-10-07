"use client"; 
import React, { FC, useEffect } from 'react';
import Image from 'next/image';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';

import './index.scss';
import { PlayerColor, PlayerType } from '@/types/PlayerTypes';

type DashboardProps = unknown;

const players: PlayerType[] = [
  {
    name: "1",
    color: PlayerColor.Blue
  },
  {
    name: "1",
    color: PlayerColor.Yellow
  },
  {
    name: "1",
    color: PlayerColor.Red
  },
  {
    name: "1",
    color: PlayerColor.Purple
  },
  // {
  //   name: "1",
  //   color: PlayerColor.Green
  // },
];

export const Dashboard: FC<DashboardProps> = () => {
  useEffect(() => {
    document.documentElement.style.setProperty(CSSDecksCount, String(players.length));
  }, []);
  return(
    <div className={`dashboard dashboard--total-count-${players.length}`}>
      {players.map((player, index) => {
        return <PlayerDeck index={index} key={index} color={player.color} name={player.name} />;
      })}
       <Image
          fill
          alt=''
          src="/images/warp.png"
          style={{
            objectFit: 'cover',
          }}
          className='dashboard__warp'
        />
    </div>
  );
};
