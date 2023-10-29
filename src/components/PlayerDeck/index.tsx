"use client"; 
import React, { FC, useEffect, useRef, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';

import { Planet } from './Planet';
import { CSSDeckIndex, CSSDeckColor } from '@/const/css-consts';
import { PlayerType } from '@/types/PlayerTypes';
import { CardModal } from '../CardModal';

import { ConflictZone } from './ConflctZone';

import './index.scss';

type PlayerDeckProps = { index: number } & PlayerType;

const countOfPlanets = 5;
const racesCount = 50;

export const PlayerDeck: FC<PlayerDeckProps> = ({ index, color, playerName }) => {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [iconImage, setIconImage] = useState<string>();
  const [hoveredSrc, setHoveredSrc] = useState<string>('');
  const [clientX, setClientX] = useState<number>(0);
  const [cardModalIsVisible, setCardModalIsVisible] = useState<boolean>(false);

  const handleCardHoverEnter = (event: React.PointerEvent) => {
    setClientX(event.clientX);
    setTimeout(() => {
      setCardModalIsVisible(true);
    }, 500);
  };

  const handleCardHoverLeave = () => {
    setCardModalIsVisible(false);
  };

  useEffect(() => {
    const race = Math.ceil(Math.random() * racesCount);
    setHoveredSrc(`/images/races/${race}.webp`);
    setIconImage(`/images/races_preview/${race}.webp`);
  }, []);

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
      {
        [...Array(countOfPlanets)].map((_, index) => {
          return(
            <Planet key={index} index={index} color={color} playerName={playerName} />
          );
        })
      }
      {
        iconImage &&
        <button
          className="player-deck__icon"
          style={{ borderColor: color}}
          onPointerEnter={event => handleCardHoverEnter(event)}
          onPointerLeave={handleCardHoverLeave}
        >
          <Image
              className='player-deck__icon-image'
              fill
              sizes='100%'
              alt=''
              src={iconImage}
              style={{
                objectFit: 'contain',
              }}
          />
        </button>
      }
      <CardModal src={hoveredSrc} isVisible={cardModalIsVisible} clientX={clientX} />
    </div>
  );
};
