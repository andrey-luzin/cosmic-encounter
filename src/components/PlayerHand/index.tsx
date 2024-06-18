"use client";
import React, { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { CardModal } from '../CardModal';

import ArrowIcon from '../../../public/icons/arrow-down.svg';

import { CosmicCardType } from '@/types/CardTypes';
import { COSMIC_CARDS_PATH } from '@/const';
import { useGetCosmicCards } from '@/hooks/useGetCosmicCards';

import './index.scss';
import { useStore } from '@/store';
import { Button } from '../FormComponents/Button';

type PlayerHandProps = unknown;

export const PlayerHand: FC<PlayerHandProps> = () => {
  const { state, dispatch } = useStore();

  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [hoveredSrc, setHoveredSrc] = useState<string>('');
  const [clientX, setClientX] = useState<number>(0);

  const handleArrowClick = useCallback(() => {
    setIsFullView(!isFullView);
  }, [isFullView]);

  const handleCardHoverEnter = (event: React.PointerEvent, src: string) => {
    setClientX(event.clientX);
    setTimeout(() => {
      setHoveredSrc(src);
    }, 400);

    return setHoveredSrc('');
  };

  const handleCardHoverLeave = () => {
    setHoveredSrc('');
  };

  const players = state.gameState.players;
  const activePlayer = state.gameState.activePlayer;

  if (!(activePlayer && players)) {
    return null;
  }

  return(
    <>
      <div className="player-hand">
        <div className={cx(
          "player-hand__cards-list",
          { "player-hand__cards-list--is-not-full-view": !isFullView }
        )}>
          {
            players[activePlayer].cards.map(card => {
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
                  {
                    activePlayer &&
                    <div className="player-hand__play-btn-wrapper">
                      <Button className="player-hand__play-btn" size='s'>Разыграть</Button>
                    </div>
                  }
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
