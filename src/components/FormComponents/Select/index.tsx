import React, { FC } from 'react';
import cx from 'classnames';
import { Property } from 'csstype';
import ReactSelect, { Props } from 'react-select';
import { styles } from './styles';

import './index.scss';

export interface ISelectOption {
  value: string | number,
  label?: string | number,
  color?: Property.Color,
}

type SelectProps = {
  options: ISelectOption[],
  label?: string,
  onChange?: Props['onChange'],
  className?: string,
  value?: ISelectOption,
};

export const Select: FC<SelectProps> = ({ label, options, onChange, className, value }) => {
  return(
    <div className={cx("select", className)}>
      {
        label &&
        <p className='select__label'>{label}</p>
      }
      <ReactSelect
        onChange={onChange}
        options={options}
        value={value}
        defaultValue={!value ? options[0] : undefined}
        styles={styles}
        isSearchable={false}
      />
    </div>
  );
};
