'use client';
import React, { FC, PropsWithChildren } from 'react';
import cx from 'classnames';

import './index.scss';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  view?: 'default' | 'filled' | 'warning'
  size?: 'l' | 'm' | "s" | 'xs'
};

export const Button: FC<PropsWithChildren<ButtonProps>> = ({
  className,
  onClick,
  children,
  disabled,
  view = 'default',
  size = 'm',
}) => {
  return(
    <button
      className={cx(
        `button button--view-${view} button--size-${size}`,
        className
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span className='button__children'>{children}</span>
    </button>
  );
};
