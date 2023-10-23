import React, { FC, useCallback, useState } from 'react';
import cx from 'classnames';
import ArrowIcon from '../../../public/icons/arrow-down.svg';

import './index.scss';
import { CardModal } from '../CardModal';

type PlayerHandProps = unknown;

const cards: number[] = [1,3];

export const PlayerHand: FC<PlayerHandProps> = () => {
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
    }, 800);
  };

  const handleCardHoverLeave = () => {
    setHoveredSrc('');
    setClientX(0);
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
              const src = `/images/cards/${card}.webp`;
              return (
                <div
                  className="player-hand__card"
                  key={card}
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
