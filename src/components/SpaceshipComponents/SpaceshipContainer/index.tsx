"use client";
import React, { FC, useCallback, useEffect, useState } from 'react';
import cx from 'classnames';
import { useDrop } from 'react-dnd';

import { Spaceship } from '../Spaceship';
import { ItemTypes, DropStateType } from '@/types/DnDTypes';
import { PlayerType,  } from '@/types/PlayerTypes';
import { useGameLog } from '@/hooks/useGameLog';
import { useI18n } from '@/i18n';

import './index.scss';

type SpaceshipContainerProps = {
  objectId: string,
  onLoad: (args: DropStateType) => void,
  color?: PlayerType['color'],
  isInWarp?: boolean,
  spaceshipsCount?: number,
  className?: string,
};

export const SpaceshipContainer: FC<SpaceshipContainerProps> = ({
  color,
  objectId,
  onLoad,
  className,
  isInWarp = false,
  spaceshipsCount = 0,
}) => {
  const { addToLog } = useGameLog();
  const { t } = useI18n();
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
    currentPlayerName: PlayerType['name']
  ) => {
    addToLog(`<span style='color: ${currentColor}'>${t('common.player')}</span> ${t('log.movedShip')}`);
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
  }, [addToLog, spaceshipsGroup]);

  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.SPACESHIP,
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
    drop: (item: { objectId: string } & PlayerType)  => {
      onSpaceShipDrop(item.color, item.name);
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
    <div className={cx(
      'spaceship-container',
      { 'spaceship-container--is-warp': isInWarp },
      className
    )}>
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
