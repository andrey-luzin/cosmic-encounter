import { StylesConfig } from "react-select";
import { ISelectOptions } from ".";
import chroma from 'chroma-js';

const dot = (color?: string) => ({
  alignItems: 'center',
  display: 'flex',

  ':before': {
    backgroundColor: color,
    borderRadius: 10,
    content: color ? '" "' : 'none',
    display: 'block',
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

export const styles: StylesConfig<ISelectOptions> = {
  control: (styles) => ({
    ...styles, 
    backgroundColor: 'var(--color-bg-main)',
    minHeight: 48,
    border: 'none',
    borderRadius: 'var(--border-radius)',
    overflow: 'hidden',
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color || 'white');
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.15).css()
        : undefined,
      color: isDisabled
        ? '#ccc'
        : isSelected
        ? !data.color || chroma.contrast(color, 'white') > 2
          ? 'var(--color-deck-text)'
          : 'var(--color-text)'
        : data.color,
      cursor: isDisabled ? 'not-allowed' : !isSelected ? 'pointer' : 'default',
      padding: '.65rem 0.8rem',

      ':active': {
        ...styles[':active'],
        backgroundColor: !isDisabled
          ? isSelected : data.color || undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, color: 'var(--color-deck-text)', ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot('var(--color-deck-text)') }),
  singleValue: (styles, { data }) => ({
    ...styles,
    color: 'var(--color-deck-text)',
    ...dot(data.color),
  }),
  valueContainer: (styles) => ({
    ...styles,
    zIndex: 'var(--z-20)',
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    zIndex: 'var(--z-20)',
  }),
  menu: (styles) => ({
    ...styles,
    backgroundColor: 'var(--color-bg-main)',
    borderRadius: 'var(--border-radius)',
    overflow: 'hidden',
    margin: '4px 0',
  }),
  menuList: (styles) => ({
    ...styles,
    padding: 0,
  })
};