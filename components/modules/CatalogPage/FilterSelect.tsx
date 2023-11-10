import React, {useState} from 'react';
import {useAppSelector} from '../../../hooks/redux';
import {SelectOptionType} from '../../../types/common';
import Select from 'react-select';
import {controlStyles, menuStyles, selectStyles} from '../../../styles/catalogPage/select';
import {createSelectOption} from '../../../utils/common';
import {optionStyles} from '../../../styles/searchInput/index';
import {categoriesOptions} from '../../../utils/selectContents';

export const FilterSelect = () => {

  const {theme} = useAppSelector((state) => state.theme)

  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedCategoryOption: SelectOptionType) => {
    setCategoryOption(selectedCategoryOption)
  }


  return (
    <Select
      placeholder={'Поиск'}
      value={categoryOption || createSelectOption('По популярности')}
      onChange={handleSearchOptionChange}
      styles={{
        ...selectStyles,
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
      isSearchable={false}
      options = {categoriesOptions}
    />
  )
};

