"use client"; 
import React, { FC } from 'react';

import './index.scss';

type PlanetProps = unknown;

const imagesCount = 36;

export const Planet: FC<PlanetProps> = () => {
  return(
    <div className="planet">
      <div className="planet__atmosphere">
        <div className="planet__surface" style={{
          backgroundImage: `url('/images/textures/texture${Math.ceil(Math.random() * imagesCount)}.webp');`
        }} />
      </div>
    </div>
  );
};
