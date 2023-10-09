"use client"; 
import React, { FC, useCallback, useEffect, useState } from 'react';
import { useDrop } from 'react-dnd';
import cx from 'classnames';
import { nanoid } from 'nanoid';

import { Spaceship } from '@/components/PlayerDeck/Spaceship';
import { PlayerType } from '@/types/PlayerTypes';
import { ItemTypes } from '@/types/DnDTypes';

import './index.scss';

type PlanetProps = PlayerType;

const imagesCount = 36;
const initSpaceshipsCount = 4;

export const Planet: FC<PlanetProps> = ({ color, playerName }) => {
  const [planetImage, setPlanetImage] = useState<string>();
  const [spaceshipsGroup, setSpaceshipsGroup] = useState<({ count: number } & PlayerType)[]>(
    [{ count: initSpaceshipsCount, color, playerName }]
  );
  const [planetId] = useState<string>(nanoid());

  useEffect(() => {
    setPlanetImage(`url('/images/textures/texture${Math.ceil(Math.random() * imagesCount)}.webp')`);
  }, []);

  const onSpaceShipDrag = useCallback((currentColor: PlayerType['color']) => {
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
      handlerId: monitor.getHandlerId(),
    }),
    drop: (item: { planetId: string } & PlayerType)  => {
      onSpaceShipDrop(item.color, item.playerName);
    },
    canDrop(item) {
      if (item.planetId === planetId) {
        return false;
      }
      return true;
    },
  }), [onSpaceShipDrop, color, planetId]);

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
        <div className="planet__surface" style={{
          backgroundImage: planetImage
        }} />
        <div className="planet__ships-container">
          {
            spaceshipsGroup.map((group, index) => {
              return(
                <div className="planet__ships-group" key={index}>
                  {
                    [...Array(group.count)].map((_, index) => {
                      return (
                        <Spaceship
                          key={index}
                          color={group.color}
                          playerName={group.playerName}
                          onDrag={onSpaceShipDrag}
                          planetId={planetId}
                        />
                      );
                    })
                  }
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
};
