import React, {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {ISelectInputOption, SelectOptionType} from '../../../types/common';
import Select from 'react-select';
import {controlStyles, menuStyles, selectStyles} from '../../../styles/catalogPage/select';
import {createSelectOption} from '../../../utils/common';
import {optionStyles} from '../../../styles/searchInput/index';
import {categoriesOptions} from '../../../utils/selectContents';
import {sofasSlice} from '../../../store/reducers/SofasSlice';
import {useRouter} from 'next/router';

export const FilterSelect = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const {sofas} = useAppSelector((state) => state.sofas)

  const [categoryOption, setCategoryOption] = useState<SelectOptionType>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const updateRouteParam = (sortBy: string) =>
    router.push({
      query: {
        ...router.query,
        sortBy
      }
    }, undefined, {shallow: true})

  React.useEffect(() => {
   if(sofas.rows){
     switch (router.query.sortBy) {
       case 'cheap':
         updateCategoryOption('Сначала дешевые')
         dispatch(sofasSlice.actions.setSofasChipFirst())
         break
       case'expensive':
         updateCategoryOption('Сначала дорогие')
         dispatch(sofasSlice.actions.setSofasExpensiveFirst())
         break
       case'popular':
         updateCategoryOption('По популярности')
         dispatch(sofasSlice.actions.setSofasPopularity())
         break
       default:
         updateCategoryOption('Сначала дешевые')
         dispatch(sofasSlice.actions.setSofasChipFirst())
         break
     }
   }
  }, [sofas.rows, router.query.sortBy])

  const updateCategoryOption = (value: string) => {
    setCategoryOption({value, label: value})
  }

  const handleSearchOptionChange = (selectedCategoryOption: SelectOptionType) => {
    setCategoryOption(selectedCategoryOption)

    switch ((selectedCategoryOption as ISelectInputOption).value) {
      case 'Сначала дешевые':
        dispatch(sofasSlice.actions.setSofasChipFirst())
        updateRouteParam('cheap')
        break
      case'Сначала дорогие':
        dispatch(sofasSlice.actions.setSofasExpensiveFirst())
        updateRouteParam('expensive')
        break
      case'По популярности':
        dispatch(sofasSlice.actions.setSofasPopularity())
        updateRouteParam('popular')
        break
    }
  }

  const {sofasItem} = useAppSelector((state => state.sofas))


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

