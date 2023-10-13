import React, {useState} from 'react';
import Select from 'react-select'
import {SelectOptionType} from '../../../types/common';
import {controlStyles, inputStyles, menuStyles} from '../../../styles/searchInput/index';

export const SearchInput = () => {

  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    setSearchOption(selectedOption)
  }

  return (
    <Select
    placeholder={'Поиск'}
    value={searchOption}
    onChange={handleSearchOptionChange}
    styles={{
      ...inputStyles,
      control: (defaultStyles) => ({
        ...controlStyles(defaultStyles),
      menu: (defaultStyles) => ({
          ...menuStyles(defaultStyles)})
      }),
    }}
    options = {[1,2,3,4,5,6,7,8,9,10,11,12,13,14].map((item) => ({value: item, label: item}))}
    />
  )
};

