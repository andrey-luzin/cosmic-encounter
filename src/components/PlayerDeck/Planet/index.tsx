"use client"; 
import React, { FC, useEffect, useState } from 'react';

import { Spaceship } from '@/components/PlayerDeck/Spaceship';
import { PlayerType } from '@/types/PlayerTypes';

import './index.scss';

type PlanetProps = PlayerType;

const imagesCount = 36;
const initSpaceshipsCount = 4;

export const Planet: FC<PlanetProps> = ({ color, name }) => {
  const [planetImage, setPlanetImage] = useState<string>();
  const [spaceshipsGroup, setSpaceshipsGroup] =
    useState<({ count: number } & PlayerType)[]>([{ count: initSpaceshipsCount, color, name }]);

  useEffect(() => {
    setPlanetImage(`url('/images/textures/texture${Math.ceil(Math.random() * imagesCount)}.webp')`);
  }, []);

  return(
    <div className="planet">
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
                        <Spaceship key={index} color={group.color} />
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
