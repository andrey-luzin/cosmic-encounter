import React, { FC, useCallback, useState } from 'react';
import cx from 'classnames';
import ArrowIcon from '../../../public/icons/arrow-down.svg';

import './index.scss';

type PlayerHandProps = unknown;

const cards = [1,2,3,5,10,11,12,13,14,15];

export const PlayerHand: FC<PlayerHandProps> = () => {
  const [isFullView, setIsFullView] = useState<boolean>(true);

  const handleArrowClick = useCallback(() => {
    setIsFullView(!isFullView);
  }, [isFullView]);

  return(
    <div className="player-hand">
      <div className={cx(
        "player-hand__cards-list",
        { "player-hand__cards-list--is-not-full-view": !isFullView }
      )}>
        {
          cards.map(card => {
            return (
              <div className="player-hand__card" key={card}>
                <img
                  src={`/images/cards/${card}.webp`}
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
  );
};
