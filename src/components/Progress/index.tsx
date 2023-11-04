import React, { FC } from 'react';
import { PreloadState } from '@/hooks/usePreload';

import './index.scss';

type ProgressProps = {
  value: PreloadState['progress'];
};

export const Progress: FC<ProgressProps> = ({ value }) => {
  return(
    <div className="progress">
      <div className="progress__text">Resources are loading</div>
      <span className="progress__value">{value.toFixed(2)} %</span>
    </div>
  );
};
