import React, { FC } from 'react';

import './index.scss';

type PlanetProps = unknown;

export const Planet: FC<PlanetProps> = () => {
  return(
    <div className="planet">
      <div className="planet__atmosphere">
        <div className="planet__surface"></div>
      </div>
    </div>
  );
};
