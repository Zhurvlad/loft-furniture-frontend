import {CSSObjectWithLabel, GroupBase, OptionProps, StylesConfig} from 'react-select';
import {ISelectInputOption} from '../../types/common';


export const controlStyles = (
  defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  backgroundColor: theme === 'dark' ? '#313131' : '#f2f2f2',
  border: '1px solid #e6e6e6',
  '&:hover': {borderColor: '#e6e6e6',},
  height: '40px',
  boxShadow: 'none',
  cursor: 'text',
  '& .css-1dimb5e-singleValue': {color: theme === 'dark' ? '#f2f2f2' : '#313131'},

})

export const menuStyles = (defaultStyles: CSSObjectWithLabel, theme: string) => ({
  ...defaultStyles,
  boxShadow: 'none',
  borderRadius: 'none',
  borderTopLeftRadius: 0,
  borderTopRightRadius: 0,
  height: 'auto',
  overflow: 'hidden',
  minHeight: 30,
  backgroundColor: theme === 'dark' ? '#313131' : '#f2f2f2',

})

export const optionStyles = (
  defaultStyles: CSSObjectWithLabel,
  state: OptionProps<ISelectInputOption, boolean, GroupBase<ISelectInputOption>>,
  theme: string,
) => {

  const backgroundHoverForLightMode = state.isSelected
    ? state.isSelected ? '#9e9e9e' : '#f2f2f2'
    : state.isSelected ? '#f2f2f2' : '#9e9e9e'

  const backgroundHoverForDarkMode = state.isSelected
    ? state.isSelected ? '#f2f2f2' : '#9e9e9e'
    : state.isSelected ? '#9e9e9e' : '#f2f2f2'

  const colorHoverForLightMode = state.isSelected
    ? state.isSelected ? '#f2f2f2' : '#313131'
    : state.isSelected ? '#313131' : '#f2f2f2'

  const colorHoverForDarkMode = state.isSelected
    ? state.isSelected ? '#313131' : '#f2f2f2'
    : state.isSelected ? '#f2f2f2' : '#313131'

  return {
    ...defaultStyles,
    cursor: 'pointer',
    '&:hover': {
      backgroundColor:
        theme === 'dark'
          ? backgroundHoverForDarkMode
          : backgroundHoverForLightMode,
      color:
        theme === 'dark'
          ? colorHoverForDarkMode
          : colorHoverForLightMode
    },
    backgroundColor:
      theme === 'dark'
        ? state.isSelected ? '#f2f2f2' : '#313131'
        : state.isSelected ? '#9e9e9e' : '#f2f2f2',
    color:
      theme === 'dark'
        ? state.isSelected ? '#313131' : '#f2f2f2'
        : state.isSelected ? '#f2f2f2' : '#313131',
  }


}

export const inputStyles: StylesConfig<ISelectInputOption, boolean, GroupBase<ISelectInputOption>> = {

  indicatorSeparator: () => ({
    border: 'none',
  }),
  dropdownIndicator: () => ({
    display: 'none'
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#9d9d9d',

  }),
  valueContainer: (defaultStyles) => ({
    ...defaultStyles,
    marginLeft: '50px',
  }),
  menuList: (defaultStyles) => ({
    ...defaultStyles,
    paddingTop: 0,
    paddingBottom: 0,
    minHeight: 30,
    '&::-webkit-scrollbar': {
      width: '8px',
    },
    '&::-webkit-scrollbar-track': {
      background: 'transparent',
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#454545',
      borderRadius: '3px',
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'grey',
    }
  }),
}
