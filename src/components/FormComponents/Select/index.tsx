import React, { FC } from 'react';
import ReactSelect from 'react-select';
import { styles } from './styles';
import './index.scss';

export interface ISelectOptions {
  value: string | number,
  label?: string | number,
  color?: any,
}

type SelectProps = {
  options: ISelectOptions[],
  label?: string,
};

export const Select: FC<SelectProps> = ({ label, options }) => {
  return(
    <div className="select">
      {
        label &&
        <p className='select__label'>{label}</p>
      }
      <ReactSelect
        options={options}
        defaultValue={options[0]}
        styles={styles}
      />
    </div>
  );
};
