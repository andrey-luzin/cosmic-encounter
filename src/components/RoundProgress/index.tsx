import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { SettingsMenu } from '../SettingsMenu';

import { CSSTopPanelHeight } from '@/const/css-consts';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import CogIcon from '../../../public/icons/cog.svg';
import QueueListIcon from '../../../public/icons/queue-list.svg';

import './index.scss';
import { steps } from './const';

type RoundProgressProps = unknown;

export const RoundProgress: FC<RoundProgressProps> = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [settingsIsVisible, setSettingsIsVisible] = useState<boolean>(true);
  const { state, dispatch } = useStore();
  const { players, activePlayer } = state.gameState;

  useLayoutEffect(() => {
    const updateTopPanelHeight = () => {
      if (divRef.current) {
        document.documentElement.style.setProperty(
          CSSTopPanelHeight, `${divRef.current.offsetHeight}px`
        );
      }
    };
    updateTopPanelHeight();
    window.addEventListener('resize', updateTopPanelHeight);
    return () => window.removeEventListener('resize', updateTopPanelHeight);
  }, []);

  const handleSettingsClick = (isVisible: boolean) => {
    setSettingsIsVisible(isVisible);
  };

  const handleLogClick = useCallback(() => {
    dispatch({
      type: ActionTypes.SET_GAMELOG_VISIBILITY,
      payload: !state.gameLogIsOpen
    });
  }, [dispatch, state]);

  return(
    <div className="round-progress" ref={divRef}>
      <span className='round-progress__tool-wrapper'>
        <button
          className="round-progress__tool-btn"
          onClick={handleLogClick}
          title='Лог'
        >
          <QueueListIcon className={cx(
            "round-progress__tool-icon",
            { 'round-progress__tool-icon--is-active': state.gameLogIsOpen }
          )}
          />
        </button>
      </span>
      <div className="round-progress__current-player" title={activePlayer}>
        Активный игрок:
        <span
          className="round-progress__player-name"
          style={{ color: players && activePlayer && players[activePlayer].color }}
        >{activePlayer || '–'}</span>
      </div>
      <div className="round-progress__steps-list">
        {
          steps.map((step) => {
            return (
              <span
                className={cx(
                  "round-progress__step", 
                  { "round-progress__step--is-active": state.gameState.phase === step.phase }
                )}
                key={step.name}
              >{step.name}</span>
            );
          })
        }
      </div>
      <button
        className="round-progress__tool-btn"
        onClick={() => handleSettingsClick(true)}
        title='Настройки'
      >
        <CogIcon className="round-progress__tool-icon round-progress__tool-icon--animation" />
      </button>
      <SettingsMenu
        isVisible={settingsIsVisible}
        onClose={() => handleSettingsClick(false)}
      />
    </div>
  );
};
