import React, { FC, InputHTMLAttributes, useState } from 'react';
import cx from 'classnames';
import { nanoid } from 'nanoid';

import './index.scss';

type CheckboxProps = {
  id?: InputHTMLAttributes<HTMLInputElement>['id'],
  label?: string,
  value?: InputHTMLAttributes<HTMLInputElement>['value'],
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void,
  checked?: InputHTMLAttributes<HTMLInputElement>['checked'],
  disabled?: InputHTMLAttributes<HTMLInputElement>['disabled'],
  className?: string,
};

export const Checkbox: FC<React.PropsWithChildren<CheckboxProps>> = ({
  id,
  checked = false,
  onChange,
  className,
  disabled,
  children,
}) => {
  const [checkboxId, _setCheckboxId] =
    useState<InputHTMLAttributes<HTMLInputElement>['id']>(id || nanoid());

  return(
    <label className={cx('checkbox', className)}>
      <input
        id={checkboxId}
        type="checkbox"
        defaultChecked={checked}
        className="checkbox__input"
        onChange={onChange}
        disabled={disabled}
      />
      <span className="checkbox__text">
        {children}
      </span>
    </label>
  );
};