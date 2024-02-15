"use client";
import React, { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { CardModal } from '../CardModal';

import ArrowIcon from '../../../public/icons/arrow-down.svg';

import './index.scss';
import { CosmicCardType } from '@/types/CardTypes';
import { COSMIC_CARDS_PATH } from '@/const';
import { useGetCosmicCards } from '@/hooks/useGetCosmicCards';

type PlayerHandProps = unknown;

export const PlayerHand: FC<PlayerHandProps> = () => {
  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [hoveredSrc, setHoveredSrc] = useState<string>('');
  const [clientX, setClientX] = useState<number>(0);
  const [cards, setCards] = useState<CosmicCardType[]>([]);
  const { getCards } = useGetCosmicCards();

  useEffect(() => {
    setCards(getCards(8));
  }, [getCards]);

  const handleArrowClick = useCallback(() => {
    setIsFullView(!isFullView);
  }, [isFullView]);

  const handleCardHoverEnter = (event: React.PointerEvent, src: string) => {
    setClientX(event.clientX);
    setTimeout(() => {
      setHoveredSrc(src);
    }, 500);

    return setHoveredSrc('');
  };

  const handleCardHoverLeave = () => {
    setHoveredSrc('');
  };

  return(
    <>
      <div className="player-hand">
        <div className={cx(
          "player-hand__cards-list",
          { "player-hand__cards-list--is-not-full-view": !isFullView }
        )}>
          {
            cards.map(card => {
              const src = `/images/${COSMIC_CARDS_PATH}/${card.id}.webp`;
              return (
                <div
                  className="player-hand__card"
                  key={card.id}
                  onPointerEnter={(event) => handleCardHoverEnter(event, src)}
                  onPointerLeave={handleCardHoverLeave}
                >
                  <img
                    src={src}
                    className="player-hand__image"
                    alt=""
                  />
                </div>
              );
            })
          }
        </div>
        <button
          className={cx(
            "player-hand__hide-button",
            { "player-hand__hide-button--is-not-full-view": !isFullView }
          )}
          onClick={handleArrowClick}
        >
          <ArrowIcon />
        </button>
      </div>
      <CardModal src={hoveredSrc} isVisible={Boolean(hoveredSrc)} clientX={clientX} />
    </>
  );
};
