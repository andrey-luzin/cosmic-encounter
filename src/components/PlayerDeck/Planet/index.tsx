"use client"; 
import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { nanoid } from 'nanoid';

import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';
import { SpaceshipContainer, DropStateType } from '@/components/SpaceshipComponents/SpaceshipContainer';

type PlanetProps = PlayerType;

const imagesCount = 36;
const initSpaceshipsCount = 4;

export const Planet: FC<PlanetProps> = ({ color }) => {
  const [planetImage, setPlanetImage] = useState<string>();
  const [dropState, setDropState] = useState<DropStateType>(
    { canDrop: false, isOver: false, drop: () => null }
  );
  const { canDrop, isOver, drop } = dropState;

  const [objectId] = useState<string>(nanoid());

  useEffect(() => {
    setPlanetImage(`url('/images/textures/texture${Math.ceil(Math.random() * imagesCount)}.webp')`);
  }, []);

  const onLoadHandler = ({ canDrop, isOver, drop }: DropStateType) => {
    setDropState({ canDrop, isOver, drop });
  };

  return(
    <div
      ref={drop}
      className={cx(
        'planet',
        { 'planet--can-drop': canDrop },
        { 'planet--is-active': canDrop && isOver },
      )}
    >
      <div className="planet__atmosphere">
        <div className="planet__surface" style={{ backgroundImage: planetImage }} />
          <SpaceshipContainer
            spaceshipsCount={initSpaceshipsCount}
            color={color}
            onLoad={onLoadHandler}
            objectId={objectId}
          />
      </div>
    </div>
  );
};
