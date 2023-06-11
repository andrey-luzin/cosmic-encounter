import React, { FC, PropsWithChildren } from 'react';

import './index.scss';

type LayoutProps = unknown;

export const Layout: FC<PropsWithChildren<LayoutProps>> = ({
  children
}) => {
  return(
    <>
      {children}
    </>
  );
};
