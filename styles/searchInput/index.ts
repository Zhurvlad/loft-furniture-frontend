import {CSSObjectWithLabel, GroupBase, StylesConfig} from 'react-select';
import {ISelectInputOption} from '../../types/common';
import {defaultStyles} from 'react-select/dist/declarations/src/styles';


export const controlStyles = (
  defaultStyles: CSSObjectWithLabel) => ({
  ...defaultStyles,
  backgroundColor: 'transparent',
  border: '1px solid #e6e6e6',
  '&:hover': {borderColor: '#e6e6e6', },
  height: '40px',
  boxShadow: 'none',
  width: '840px',
  cursor: 'text',
})

export const menuStyles = (defaultStyles: CSSObjectWithLabel) => ({
  ...defaultStyles,
  boxShadow: 'none',
  borderRadius: 'none',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  height: 'auto',
  overflow: 'hidden',
  width: 'calc(100% + 40px)',
  minHeight: 30,

})

export const inputStyles: StylesConfig<ISelectInputOption, boolean, GroupBase<ISelectInputOption>> = {
  control: () => ({}),
  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none'
  }),
  menuList: () => ({}),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#414141',
  }),
  input: (defaultStyles) => ({
    ...defaultStyles,
    color: '#414141',
    paddingRight: '20px',

  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    marginLeft: '50px',

  })
}
