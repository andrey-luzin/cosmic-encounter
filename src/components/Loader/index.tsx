import React, { FC } from 'react';
import cx from 'classnames';

import './index.scss';

type LoaderProps = {
  className?: string;
};

export const Loader: FC<LoaderProps> = ({ className }) => {
  return(
    <div className={cx("loader", className)}>👾</div>
  );
};
