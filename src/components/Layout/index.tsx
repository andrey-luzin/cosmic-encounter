"use client";
import React, { FC, PropsWithChildren } from 'react';
import Image from 'next/image';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import './index.scss';

type LayoutProps = unknown;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children
}) => {
  return(
    <main className='layout'>
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