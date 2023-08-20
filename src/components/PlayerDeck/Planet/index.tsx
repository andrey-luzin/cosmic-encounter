"use client"; 
import React, { FC, useEffect, useRef, useState } from 'react';
import { CSSItemsCount } from '@/const/css-consts';

import './index.scss';

type PlanetProps = { index: number };

export const Planet: FC<PlanetProps> = ({ index }) => {
  const planetRef = useRef<HTMLDivElement | null>(null);

  const [itemsCount, setItemsCount] = useState<number>(0);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setItemsCount(Number(
      getComputedStyle(document.documentElement).getPropertyValue(CSSItemsCount)
    ));
  });

  useEffect(() => {
    if (planetRef.current) {
      planetRef.current.style.setProperty(
        '--angle',
        // `calc(150deg / ${itemsCount} * ${index})`
        `calc(360deg / ${itemsCount} * ${index})`
      );
    }
  }, [index, itemsCount]);

  return(
    <div className="planet" ref={planetRef}>
      <div className="planet__atmosphere">
        <div className="planet__surface" />
      </div>
    </div>
  );
};
