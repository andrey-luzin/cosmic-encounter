"use client"; 
import React, { FC, useCallback, useEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { Planet } from './Planet';
import { CSSDeckIndex, CSSDeckColor } from '@/const/css-consts';
import { PlayerType } from '@/types/PlayerTypes';
import { CardModal } from '../CardModal';

import { ConflictZone } from './ConflctZone';

import { RACES_PATH, RACES_PREVIEW_PATH } from '@/const';
import './index.scss';
import { Modal } from '../Modal';

type PlayerDeckProps = {
  index: number,
  checkFullCardModalIsOpen?: (value: boolean) => void
} & Omit<PlayerType, 'cards'>;

const countOfPlanets = 5;

export const PlayerDeck: FC<PlayerDeckProps> = ({
  index,
  color,
  name,
  race,
  checkFullCardModalIsOpen,
}) => {
  const deckRef = useRef<HTMLDivElement | null>(null);
  const [iconImage, setIconImage] = useState<string>();
  const [hoveredSrc, setHoveredSrc] = useState<string>('');
  const [clientX, setClientX] = useState<number>(0);
  const [cardModalIsVisible, setCardModalIsVisible] = useState<boolean>(false);
  const [fullCardModalIsVisible, setFullCardModalIsVisible] = useState<boolean>(false);

  const handleCardHoverEnter = (event: React.PointerEvent) => {
    setClientX(event.clientX);
    setTimeout(() => {
      setCardModalIsVisible(true);
    }, 500);
  };

  const handleFullCardClick = useCallback((isVisible: boolean) => {
    setFullCardModalIsVisible(isVisible);
    if (checkFullCardModalIsOpen) {
      checkFullCardModalIsOpen(isVisible);
    }
  }, [checkFullCardModalIsOpen]);

  const handleCardHoverLeave = () => {
    setCardModalIsVisible(false);
  };

  useEffect(() => {
    if (race) {
      setHoveredSrc(`/images/${RACES_PATH}/${race.id}.webp`);
      setIconImage(`/images/${RACES_PREVIEW_PATH}/${race.id}.webp`);
    }
  }, [race]);

  useEffect(() => {
    if (deckRef.current && color) {
      deckRef.current.style.setProperty(CSSDeckIndex, String(index));
      deckRef.current.style.setProperty(CSSDeckColor, color);
    }
  }, [color, index]);

  if (!color) {
    return null;
  }

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
            <Planet key={index} index={index} color={color} />
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
          onClick={() => handleFullCardClick(true)}
          title={name}
        >
          <img
            className='player-deck__icon-image'
            alt=''
            src={iconImage}
          />
        </button>
      }
      <CardModal src={hoveredSrc} isVisible={cardModalIsVisible} clientX={clientX} />
      <Modal
        isVisible={fullCardModalIsVisible}
        onClose={() => handleFullCardClick(false)}
        withoutPadding
      >
        <img src={hoveredSrc} alt="" className='player-deck__full-image' />
      </Modal>
    </div>
  );
};
