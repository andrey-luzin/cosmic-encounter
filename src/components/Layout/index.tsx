"use client";
import React, { FC, PropsWithChildren, useEffect, useRef } from 'react';
import Image from 'next/image';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './index.scss';
import { ActionTypes } from '@/store/types';
import { useStore } from '@/store';

type LayoutProps = unknown;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children
}) => {
  const { dispatch } = useStore();
  const layoutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (layoutRef.current) {
      dispatch({
        type: ActionTypes.INIT_LAYOUT,
        payload: layoutRef
      });
    }
  }, [dispatch]);
  return(
    <main className="layout" ref={layoutRef}>
      <div className="layout__bcg">
        <Image
          fill
          alt=''
          src="/images/starry_sky.jpg"
          style={{
            objectFit: 'cover',
          }}
        />
      </div>
      <DndProvider backend={HTML5Backend}>
        {children}
      </DndProvider>
    </main>
  );
};
