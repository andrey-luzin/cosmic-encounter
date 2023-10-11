"use client";
import React, { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';

import { Spaceship } from '../Spaceship';
import { ItemTypes } from '@/types/DnDTypes';
import { PlayerType } from '@/types/PlayerTypes';
import { useDrop, ConnectDropTarget } from 'react-dnd';

import './index.scss';

export type DropStateType = { canDrop: boolean, isOver: boolean, drop: ConnectDropTarget };

type SpaceshipContainerProps = {
  objectId: string,
  onLoad: (args: DropStateType) => void,
  color?: PlayerType['color'],
  isInWarp?: boolean,
  spaceshipsCount?: number,
};

export const SpaceshipContainer: FC<SpaceshipContainerProps> = ({
  color,
  objectId,
  onLoad,
  isInWarp = false,
  spaceshipsCount = 0,
}) => {
  const [spaceshipsGroup, setSpaceshipsGroup] = useState<({ count: number, color?: PlayerType['color']})[]>(
    [{ count: spaceshipsCount, color }]
  );

  const onSpaceShipDrag = useCallback((currentColor?: PlayerType['color']) => {
    const updatedSpaceshipsGroup = spaceshipsGroup.map(group => {
      if (group.color === currentColor && group.count) {
        return {
          ...group,
          count: group.count - 1,
        };
      }
      return group;
    });

    setSpaceshipsGroup(updatedSpaceshipsGroup);
  }, [spaceshipsGroup]);

  const onSpaceShipDrop = useCallback((
    currentColor: PlayerType['color'],
    currentPlayerName: PlayerType['playerName']
  ) => {
    let updatedSpaceshipsGroup = [];

    if (spaceshipsGroup.find(group => group.color === currentColor)) {
      updatedSpaceshipsGroup = spaceshipsGroup.map(group => {
        if (group.color === currentColor) {
          return {
            ...group,
            count: group.count + 1,
          };
        }
        return group;
      });
    } else {
      const newSpaceshipsGroup = { count: 1, color: currentColor, playerName: currentPlayerName };
      updatedSpaceshipsGroup = [...spaceshipsGroup, newSpaceshipsGroup];
    }

    setSpaceshipsGroup(updatedSpaceshipsGroup);
  }, [spaceshipsGroup]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SPACESHIP,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: { objectId: string } & PlayerType)  => {
      onSpaceShipDrop(item.color, item.playerName);
    },
    canDrop(item) {
      if (item.objectId === objectId) {
        return false;
      }
      return true;
    },
  }), [onSpaceShipDrop, color, objectId]);

  useEffect(() => {
    onLoad({canDrop, isOver, drop});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canDrop, drop, isOver]);

  return(
    <div className={cx('spaceship-container', { 'spaceship-container--is-warp': isInWarp })}>
      {
        spaceshipsGroup.map((group, index) => {
          return(
            <div className="spaceship-container__group" key={index}>
              {
                [...Array(group.count)].map((_, index) => {
                  return (
                    <Spaceship
                      key={index}
                      color={group.color}
                      onDrag={onSpaceShipDrag}
                      objectId={objectId}
                      isInWarp={isInWarp}
                    />
                  );
                })
              }
            </div>
          );
        })
      }
    </div>
  );
};

