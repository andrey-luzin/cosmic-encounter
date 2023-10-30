import React, { FC, useCallback, useState } from 'react';
import cx from 'classnames';

import { SettingsMenu } from '../SettingsMenu';

import './index.scss';

type RoundProgressProps = unknown;

const steps = [
  {
    name: 'Starting the Turn',
    isActive: true
  },
  {
    name: 'Regroup',
    isActive: false
  },
  {
    name: 'Destiny',
    isActive: false
  },
  {
    name: 'Launch',
    isActive: false
  },
  {
    name: 'Alliance',
    isActive: false
  },
  {
    name: 'Planning',
    isActive: false
  },
  {
    name: 'Reveal',
    isActive: false
  },
  {
    name: 'Resolution',
    isActive: false
  },
];

export const RoundProgress: FC<RoundProgressProps> = () => {
  const [settingsIsVisible, setSettingsIsVisible] = useState<boolean>(false);

  const handleSettingsClick = (val: boolean) => {
    setSettingsIsVisible(val);
  };

  return(
    <div className="round-progress">
      <div className="round-progress__current-player">
        Player:
        <span
          className="round-progress__player-name"
          style={{ color: 'var(--active-player-name)' }}
        > Player</span>
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
      <button className="round-progress__settings-btn" onClick={() => handleSettingsClick(true)}>
        👾
      </button>
      <SettingsMenu
        isVisible={settingsIsVisible}
        onClose={() => handleSettingsClick(false)}
      />
    </div>
  );
};
