import React, { FC, FormEventHandler, InputHTMLAttributes } from 'react';
import cx from 'classnames';
import { nanoid } from 'nanoid';

import './index.scss';

type InputProps = {
  className?: string,
  label?: string,
  id?: InputHTMLAttributes<HTMLInputElement>['id'],
  onInput?: FormEventHandler<HTMLInputElement>,
};

export const Input: FC<InputProps> = ({ label, id, onInput, className }) => {
  const inputId = id || nanoid();

  return(
    <div className={cx("input", className)}>
      {label &&
        <label htmlFor={inputId} className='input__label'>{label}</label>
      }
      <div className="input__field-wrapper">
        <input
          type="text"
          id={inputId}
          className='input__field'
          onInput={onInput}
        />
      </div>
    </div>
  );
};
