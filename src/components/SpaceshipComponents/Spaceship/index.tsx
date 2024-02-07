"use client";
import React, { FC } from 'react';
import cx from 'classnames';
import { PlayerColor, PlayerType } from '@/types/PlayerTypes';
import { useDrag } from 'react-dnd';
import { ItemTypes } from '@/types/DnDTypes';

import './index.scss';

type SpaceshipProps = {
  onDrag: (color?: PlayerColor) => void;
  objectId: string;
  color?: PlayerType['color'],
  isInWarp?: boolean,
};

export const Spaceship: FC<SpaceshipProps> = ({
  color,
  onDrag,
  objectId,
  isInWarp = false,
}) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.SPACESHIP,
    item: {
      color,
      objectId,
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
  }), [color, objectId, onDrag]);

  return(
    <div
      className={cx(
        'spaceship',
        { 'spaceship--is-dragging': isDragging },
        { 'spaceship--is-warp': isInWarp }
      )}
      ref={drag}
      style={{
        backgroundColor: color,
      }}
    />
  );
};
