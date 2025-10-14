"use client";
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useI18n } from '@/i18n';
import cx from 'classnames';

import { CardModal } from '../CardModal';

import ArrowIcon from '../../../public/icons/arrow-down.svg';

import { COSMIC_CARDS_PATH } from '@/const';

import './index.scss';
import { useStore } from '@/store';
import { Button } from '../FormComponents/Button';
import { DestinyCardModal } from '@/features/NewGame/DestinyCardModal';
import { useGetDestinyCards } from '@/hooks/useGetDestinyCards';
import { DestinyCardType } from '@/types/CardTypes';
import { useGetCosmicCards } from '@/hooks/useGetCosmicCards';

type PlayerHandProps = unknown;

export const PlayerHand: FC<PlayerHandProps> = () => {
  const { t } = useI18n();
  // const { getDestiny } = useGetDestinyCards();
  const { cosmicCards, getCosmicCards } = useGetCosmicCards();
  const { state } = useStore();

  const [isFullView, setIsFullView] = useState<boolean>(false);
  const [hoveredSrc, setHoveredSrc] = useState<string>('');
  const [clientX, setClientX] = useState<number>(0);
  const [destinyModalIsVisible, setDestinyModalIsVisible] = useState<boolean>(false);
  const [destinyCard, setDestinyCard] = useState<DestinyCardType | null>(null);

  useEffect(() => {
    if (state.gameState.gameIsStarted) {
      getCosmicCards(8);
    }
  }, [getCosmicCards, state.gameState.gameIsStarted]);

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

  const handleDestinyCardClick = (isVisible: boolean) => {
    setDestinyModalIsVisible(isVisible);
  };

  const handleGetDestinyCard = () => {
    // setDestinyCard(getDestiny()[0]);
    setDestinyModalIsVisible(true);
    console.log('destinyCard', destinyCard);
  };

  const players = state.gameState.players;
  const activePlayer = state.gameState.activePlayer;

  if (!(activePlayer && players)) {
    return null;
  }

  console.log('cosmicCards', cosmicCards);

  return(
    <>
      <div className="player-hand">
        <div className={cx(
          "player-hand__cards-list",
          { "player-hand__cards-list--is-not-full-view": !isFullView }
        )}>
          {
            cosmicCards?.length && cosmicCards.map(card => {
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
                      <Button className="player-hand__play-btn" size='xs'>{t('cards.play')}</Button>
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
        <Button
          className="player-hand__event-button"
          size="xs"
          onClick={handleGetDestinyCard}
        >{t('cards.takeDestiny')}</Button>
      </div>
      <CardModal src={hoveredSrc} isVisible={Boolean(hoveredSrc)} clientX={clientX} />
      {
        destinyCard &&
        <DestinyCardModal 
          isVisible={destinyModalIsVisible}
          onClose={() => handleDestinyCardClick(false)}
          destinyCard={destinyCard}
        />
      }
    </>
  );
};
