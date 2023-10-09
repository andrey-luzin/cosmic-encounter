"use client"; 
import React, { FC, useEffect } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { useDrop } from 'react-dnd';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';

import { PlayerColor, PlayerType } from '@/types/PlayerTypes';
import { ItemTypes } from '@/types/DnDTypes';

import './index.scss';

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
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SPACESHIP,
    drop: () => ({ toWarp: true }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  useEffect(() => {
    document.documentElement.style.setProperty(CSSDecksCount, String(players.length));
  }, []);

  return(
    <div className={`dashboard dashboard--total-count-${players.length}`}>
      {players.map((player, index) => {
        return <PlayerDeck index={index} key={index} color={player.color} playerName={player.playerName} />;
      })}
      <div
        className={cx(
          'dashboard__warp-container',
          { 'dashboard__warp-container--can-drop': canDrop },
          { 'dashboard__warp-container--is-active': canDrop && isOver },
        )}
        ref={drop}
      >
        <Image
          fill
          alt=''
          src="/images/warp.png"
          style={{
            objectFit: 'cover',
          }}
          className="dashboard__warp"
        />
      </div>
    </div>
  );
};
