import React, { FC } from 'react';
import cx from 'classnames';

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
  return(
    <div className="round-progress">
      <div className="round-progress__current-player">
        Player:
        <span
          className="round-progress__player-name"
          style={{ color: 'var(--active-player-name)' }}
        > Player</span>
      </div>
      <nav className="round-progress__steps-list">
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
      </nav>
    </div>
  );
};
