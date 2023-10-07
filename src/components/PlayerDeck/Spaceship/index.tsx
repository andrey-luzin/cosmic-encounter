"use client";
import React, { FC } from 'react';
import { PlayerColor } from '@/types/PlayerTypes';

import './index.scss';

type SpaceshipProps = { color: PlayerColor };

export const Spaceship: FC<SpaceshipProps> = ({ color }) => {
  return(
    <div
      className="spaceship"
      style={{
        backgroundColor: color,
      }}
    />
  );
};
