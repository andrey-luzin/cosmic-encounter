"use client"; 
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import { useDragDropManager, useDragLayer } from 'react-dnd';

import { CSSDecksCount } from '@/const/css-consts';
import { PlayerDeck } from '@/components/PlayerDeck';
import { Warp } from '../Warp';
import { PlayerHand } from '../PlayerHand';

import { PlayerColor, PlayerType } from '@/types/PlayerTypes';

import { RoundProgress } from '../RoundProgress';
import { ItemTypes } from '@/types/DnDTypes';
import { usePreload } from '@/hooks/usePreload';

import './index.scss';
import { Progress } from '../Progress';
import { GameLog } from '../GameLog';

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
  {
    playerName: "1",
    color: PlayerColor.Green
  },
];

const minScale = 0.3;
const maxScale = 1;

export const Dashboard: FC<DashboardProps> = () => {
  const deckRef = useRef<HTMLDivElement>(null);
  const scrollingAreaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startY, setStartY] = useState<number>(0);
  const [scrollTop, setScrollTop] = useState<number>(0);
  const [startX, setStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [scale, setScale] = useState(minScale); // init scal

  const dragDropManager = useDragDropManager();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const collectedProps = useDragLayer((monitor: any) => monitor.store.getState());
  const preloadState = usePreload();

  useEffect(() => {
    if (deckRef.current && scrollingAreaRef.current) {
      deckRef.current.scrollLeft = (scrollingAreaRef.current.offsetWidth - deckRef.current.offsetWidth) / 2;
      deckRef.current.scrollTop = (scrollingAreaRef.current.offsetHeight - deckRef.current.offsetHeight) / 2;
    }
  }, [preloadState]);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    if (!isDragging) {
        e.preventDefault();
        const deltaY = -e.deltaY;

        const newScale = scale + deltaY * 0.01;
        
        if (newScale >= minScale && newScale <= maxScale) {
          setScale(newScale);
        }
    }
  }, [isDragging, scale]);

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

  const handleMouseDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (deckRef.current && !(event.target as HTMLElement)?.draggable) {
      setIsDragging(true);
      setStartY(event.clientY);
      setStartX(event.clientX);
      setScrollTop(deckRef.current.scrollTop);
      setScrollLeft(deckRef.current.scrollLeft);
    }
  };

  const handleMouseMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging && deckRef.current) {
      const deltaY = event.clientY - startY;
      const deltaX = event.clientX - startX;
      deckRef.current.scrollTop = scrollTop - deltaY;
      deckRef.current.scrollLeft = scrollLeft - deltaX;
    }
  }, [isDragging, scrollLeft, scrollTop, startX, startY]);
  
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  if (preloadState.loading) {
    return <Progress value={preloadState.progress} />;
  }

  return(
    <div className="dashboard">
      <RoundProgress />
      <GameLog />
      <PlayerHand />
      <div
        className={cx(
          "dashboard__deck-wrapper",
          { 'dashboard__deck-wrapper--is-dragging': isDragging }
        )}
        ref={deckRef}
        onWheel={handleWheel}
        onPointerDown={handleMouseDown}
        onPointerMove={handleMouseMove}
        onPointerUp={handleMouseUp}
        onPointerLeave={handleMouseLeave}
      >
        <div className="dashboard__scrolling-area" ref={scrollingAreaRef}>
          <div
            className={cx(`dashboard__deck dashboard__deck--total-count-${players.length}`)}
            style={{ scale }}
          >
            {players.map((player, index) => {
              return <PlayerDeck index={index} key={index} color={player.color} playerName={player.playerName} />;
            })}
            <Warp />
          </div>
        </div>
      </div>
    </div>
  );
};
