import React, { FC, useCallback, useLayoutEffect, useRef, useState } from 'react';
import cx from 'classnames';

import { SettingsMenu } from '../SettingsMenu';

import { CSSTopPanelHeight } from '@/const/css-consts';
import { Phases } from '@/types/PhaseTypes';
import { useStore } from '@/store';
import { ActionTypes } from '@/store/types';

import './index.scss';

type RoundProgressProps = unknown;

const steps = [
  {
    phase: Phases.StartingTheTurn,
    name: 'Начало хода',
    isActive: true
  },
  {
    phase: Phases.Regroup,
    name: 'Перегруппировка',
    isActive: false
  },
  {
    phase: Phases.Destiny,
    name: 'Судьба',
    isActive: false
  },
  {
    phase: Phases.Launch,
    name: 'Запуск',
    isActive: false
  },
  {
    phase: Phases.Alliance,
    name: 'Союзы',
    isActive: false
  },
  {
    phase: Phases.Planning,
    name: 'Планирование',
    isActive: false
  },
  {
    phase: Phases.Reveal,
    name: 'Раскрытие',
    isActive: false
  },
  {
    phase: Phases.Resolution,
    name: 'Результат',
    isActive: false
  },
];

export const RoundProgress: FC<RoundProgressProps> = () => {
  const divRef = useRef<HTMLDivElement>(null);
  const [settingsIsVisible, setSettingsIsVisible] = useState<boolean>(false);
  const { state, dispatch } = useStore();

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
      type: ActionTypes.SET_GAMELOG,
      payload: {
        logIsOpen: !state.gameLog.logIsOpen
      }
    });
  }, [dispatch, state]);

  return(
    <div className="round-progress" ref={divRef}>
      <span className='round-progress__tool-wrapper'>
        <button
          className="round-progress__tool-btn"
          onClick={handleLogClick}
          title='Лог'
        >📝</button>
      </span>
      <div className="round-progress__current-player">
        Активный игрок:
        <span
          className="round-progress__player-name"
          style={{ color: 'var(--active-player-name)' }}
        >Player</span>
      </div>
      <div className="round-progress__steps-list">
        {
          steps.map((step) => {
            return (
              <span
                className={cx("round-progress__step", { "round-progress__step--is-active": step.isActive })}
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
      >⚙️</button>
      <SettingsMenu
        isVisible={settingsIsVisible}
        onClose={() => handleSettingsClick(false)}
      />
    </div>
  );
};
