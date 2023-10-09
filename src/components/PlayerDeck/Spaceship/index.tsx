"use client";
import React, { FC } from 'react';
import cx from 'classnames';
import { PlayerColor, PlayerType } from '@/types/PlayerTypes';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/types/DnDTypes';

import './index.scss';

type SpaceshipProps = {
  onDrag: (color: PlayerColor) => void;
  planetId: string;
} & PlayerType;

export const Spaceship: FC<SpaceshipProps> = ({ color, onDrag, planetId }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SPACESHIP,
    item: {
      color,
      planetId,
    },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      
      if (item && dropResult) {
        onDrag(color);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }), [color, planetId, onDrag]);

  return(
    <div
      className={cx('spaceship', { 'spaceship--is-dragging': isDragging })}
      ref={drag}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
