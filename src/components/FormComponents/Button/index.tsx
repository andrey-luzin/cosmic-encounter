'use client';
import React, { FC, PropsWithChildren } from 'react';

import './index.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<PropsWithChildren<ButtonProps>> = ({  children }) => {
  return(
    <button className="button">
      <span className='button__children'>{children}</span>
    </button>
  );
};
