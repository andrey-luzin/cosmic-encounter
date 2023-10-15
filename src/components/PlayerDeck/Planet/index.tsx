"use client"; 
import React, { FC, useEffect, useState } from 'react';
import cx from 'classnames';
import { nanoid } from 'nanoid';

import { SpaceshipContainer } from '@/components/SpaceshipComponents/SpaceshipContainer';
import { ConflictZone } from '../ConflctZone';
import { PlayerType } from '@/types/PlayerTypes';
import { DropStateType } from '@/types/DnDTypes';

import './index.scss';

type PlanetProps = PlayerType;

const imagesCount = 36;
const initSpaceshipsCount = 4;

export const Planet: FC<PlanetProps & { index: number}> = ({ color, index }) => {
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
    <div className={cx('planet')}>
      <div
          ref={drop}
          className={cx(
          'planet__container',
          { 'planet__container--can-drop': canDrop },
          { 'planet__container--is-over': canDrop && isOver },
        )}
      >
        <div className={cx('planet__atmosphere')}>
          <div className="planet__surface" style={{ backgroundImage: planetImage }} />
            <SpaceshipContainer
              spaceshipsCount={initSpaceshipsCount}
              color={color}
              onLoad={onLoadHandler}
              objectId={objectId}
            />
        </div>
      </div>

      {/* <ConflictZone classname="planet__conflct-zone"  /> */}
    </div>
  );
};
