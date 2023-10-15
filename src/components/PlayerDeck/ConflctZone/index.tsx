"use client";
import React, { FC, useState } from 'react';
import cx from 'classnames';

import { DropStateType } from '@/types/DnDTypes';
import { SpaceshipContainer } from '@/components/SpaceshipComponents/SpaceshipContainer';

import './index.scss';

type ConflictZoneProps = { classname: string };

export const ConflictZone: FC<ConflictZoneProps> = ({ classname }) => {
  const [dropState, setDropState] = useState<DropStateType>(
    { canDrop: false, isOver: false, drop: () => null }
  );

  const { canDrop, isOver, drop } = dropState;
  const onLoadHandler = ({ canDrop, isOver, drop }: DropStateType) => {
    setDropState({ canDrop, isOver, drop });
  };

  return(
    <div className={cx("conflct-zone", classname)}>
      <div
        // TODO: ref by condition of player's status (isAttacker, isDefender)
        // ref={drop}
        className={cx(
          'conflct-zone__area conflct-zone__area--defend',
          { 'conflct-zone__area--can-drop': canDrop },
          { 'conflct-zone__area--is-over': canDrop && isOver }
        )}
      >
        <SpaceshipContainer className="conflct-zone__spaceship-container" objectId="defend" onLoad={onLoadHandler} />
      </div>
      <div 
        ref={drop}
        className={cx(
          'conflct-zone__area conflct-zone__area--attack',
          { 'conflct-zone__area--can-drop': canDrop },
          { 'conflct-zone__area--is-over': canDrop && isOver }
        )}
      >
        <SpaceshipContainer className="conflct-zone__spaceship-container" objectId="attack" onLoad={onLoadHandler} />
      </div>
    </div>
  );
};
