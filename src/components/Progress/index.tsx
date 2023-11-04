import React, { FC } from 'react';
import { PreloadState } from '@/hooks/usePreload';

import './index.scss';

type ProgressProps = {
  value: PreloadState['progress'];
};

export const Progress: FC<ProgressProps> = ({ value }) => {
  return(
    <div className="progress">
      <h1 className="progress__title">Cosmic Encounter</h1>
      <span className="progress__text">Resources are loading</span>
      <span className="progress__value">{value.toFixed(2)}%</span>
      <span className="progress__emoji">👾</span>
    </div>
  );
};
