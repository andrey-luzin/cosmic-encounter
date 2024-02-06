import React, { FC, useState } from 'react';
import cx from 'classnames';

import { SettingsMenu } from '../SettingsMenu';

import './index.scss';
import { Phases } from '@/types/PhaseTypes';

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
  const [settingsIsVisible, setSettingsIsVisible] = useState<boolean>(false);

  const handleSettingsClick = (isVisible: boolean) => {
    setSettingsIsVisible(isVisible);
  };

  return(
    <div className="round-progress">
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
        className="round-progress__settings-btn"
        onClick={() => handleSettingsClick(true)}
        title='Настройки'
      >
        ⚙️
      </button>
      <SettingsMenu
        isVisible={settingsIsVisible}
        onClose={() => handleSettingsClick(false)}
      />
    </div>
  );
};
