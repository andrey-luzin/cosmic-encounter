"use client"; 
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { useDragDropManager, useDragLayer } from 'react-dnd';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';
import { Warp } from '../Warp';

import { PlayerColor, PlayerType } from '@/types/PlayerTypes';

import { RoundProgress } from '../RoundProgress';
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
  const deckRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const dragDropManager = useDragDropManager();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collectedProps = useDragLayer((monitor: any) => monitor.store.getState());

  useEffect(() => {
    const itemType = dragDropManager.getMonitor().getItemType();

    if (itemType === ItemTypes.SPACESHIP) {
      setIsDragging(false);
    }
  // collectedProps is needs with state
  }, [collectedProps, dragDropManager]);

  useEffect(() => {
    document.documentElement.style.setProperty(CSSDecksCount, String(players.length));
  }, []);

  const handleMouseDown = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (deckRef.current) {
      setIsDragging(true);
      setStartY(event.clientY);
      setScrollTop(deckRef.current.scrollTop);
    }
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    if (isDragging && deckRef.current) {
      const deltaY = event.clientY - startY;
      deckRef.current.scrollTop = scrollTop - deltaY;
    }
  }, [isDragging, scrollTop, startY]);
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  return(
    <div className="dashboard">
      <RoundProgress />
      <div
        className={cx(
          `dashboard__deck dashboard__deck--total-count-${players.length}`,
          { 'dashboard__deck--is-dragging': isDragging }
        )}
        ref={deckRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseLeave} 
      >
        {players.map((player, index) => {
          return <PlayerDeck index={index} key={index} color={player.color} playerName={player.playerName} />;
        })}
        <Warp />
      </div>
    </div>
  );
};
