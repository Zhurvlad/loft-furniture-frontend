import React, {useState} from 'react';
import Select from 'react-select'
import {SelectOptionType} from '../../../types/common';
import {controlStyles, inputStyles, menuStyles, optionStyles} from '../../../styles/searchInput/index';
import {useAppSelector} from '../../../hooks/redux';

export const SearchInput = () => {

  const {theme} = useAppSelector((state) => state.themeReducer)

  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }

  console.log(theme)

  return (
    <Select
    placeholder={'Поиск'}
    value={searchOption}
    onChange={handleSearchOptionChange}
    styles={{
      ...inputStyles,
      control: (defaultStyles) => ({
        ...controlStyles(defaultStyles, theme),
      }),
      menu: (defaultStyles) => ({
        ...menuStyles(defaultStyles, theme),
      }),
      input: (defaultStyles) => ({
        ...defaultStyles,
        color: theme === 'dark' ? '#f2f2f2' : '#313131',
        paddingRight: '20px',
      }),
      option: (defaultStyles, state) => ({
        ...optionStyles(defaultStyles, state, theme)
      })
    }}
    options = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item) => ({value: item, label: item}))}
    />
  )
};

