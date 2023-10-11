"use client";
import React, { FC, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { SpaceshipContainer, DropStateType } from '@/components/SpaceshipComponents/SpaceshipContainer';

import './index.scss';

type WarpProps = unknown;

export const Warp: FC<WarpProps> = () => {
  // const [objectId] = useState<string>('warp');
  const [dropState, setDropState] = useState<DropStateType>(
    { canDrop: false, isOver: false, drop: () => null }
  );
  const { canDrop, isOver, drop } = dropState;

  // const [{ canDrop, isOver }, drop] = useDrop(() => ({
  //   accept: ItemTypes.SPACESHIP,
  //   drop: () => ({ toWarp: true }),
  //   collect: (monitor) => ({
  //     isOver: monitor.isOver(),
  //     canDrop: monitor.canDrop(),
  //   }),
  // }));

  const onLoadHandler = ({ canDrop, isOver, drop }: DropStateType) => {
    setDropState({ canDrop, isOver, drop });
  };

  return(
    <div
      className={cx(
        'warp',
        { 'warp--can-drop': canDrop },
        { 'warp--is-active': canDrop && isOver },
      )}
      ref={drop}
    >
      <Image
        fill
        alt=''
        src="/images/warp.png"
        style={{
          objectFit: 'cover',
        }}
        className="warp__image"
      />
      <div className="warp__ship-container">
        <SpaceshipContainer objectId={'warp'} onLoad={onLoadHandler} isInWarp />
      </div>
    </div>
  );
};
