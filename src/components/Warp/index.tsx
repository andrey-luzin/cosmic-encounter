"use client";
import React, { FC, useState } from 'react';
import cx from 'classnames';
import Image from 'next/image';
import { SpaceshipContainer } from '@/components/SpaceshipComponents/SpaceshipContainer';
import { DropStateType } from '@/types/DnDTypes';

import './index.scss';

type WarpProps = unknown;

export const Warp: FC<WarpProps> = () => {
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
        { 'warp--is-over': canDrop && isOver },
      )}
      ref={drop}
    >
      <Image
        fill
        alt=''
        sizes='100%'
        src="/images/warp.webp"
        style={{
          objectFit: 'cover',
        }}
        className="warp__image"
        priority
      />
      <div className="warp__ship-container">
        <SpaceshipContainer objectId={'warp'} onLoad={onLoadHandler} isInWarp />
      </div>
    </div>
  );
};
