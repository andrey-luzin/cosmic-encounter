'use client';
import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';

import './index.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  view?: 'default' | 'filled'
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  onClick,
  children,
  disabled,
  view = 'default',
}) => {
  return(
    <button
      className={cx(`button button--view-${view}`, className)}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='button__children'>{children}</span>
    </button>
  );
};
