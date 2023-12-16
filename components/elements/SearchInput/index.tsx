import React, {useState} from 'react';
import Select from 'react-select'
import {toast} from 'react-toastify';
import {useRouter} from 'next/router';

import {useAppSelector} from '../../../hooks/redux';
import {useDebounceCallback} from '../../../hooks/useDebounceCallback';

import {createSelectOption} from '../../../utils/common';
import {Api} from '../../../utils/api/index';

import {ISelectInputOption, SelectOptionType} from '../../../types/common';

import {SearchSvg} from '../SearchSvg/index';

import {NoOptionsMessage, NoOptionsSpinner} from '../SelectOptionsMessage/index';
import {controlStyles, inputStyles, menuStyles, optionStyles} from '../../../styles/searchInput/index';
import styles from '../../../styles/header/index.module.scss';

export const SearchInput = () => {

  React.useEffect(() => {
    (async () => {
    const d =  await Api().sofas.searchSofa('')
      const names = d.rows.map((item) => item.name).map(createSelectOption)
      setOptions(names)
    })()
  }, [])

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const [searchOption, setSearchOption] = useState<SelectOptionType>(null)
  const [options, setOptions] = React.useState([])
  const [inputValue, setInputValue] = React.useState('')

  const [spinner, setSpinner] = React.useState(false)

  const router = useRouter()

  const handleSearchOptionChange = (selectedOption: SelectOptionType) => {
    if(!selectedOption){
      setSearchOption(null)
      return
    }

    const name = (selectedOption as ISelectInputOption)?.value as string

    if(name) {
      getSofaByName(name)
    }

    setSearchOption(selectedOption)

  }

  const delayCallback = useDebounceCallback(1000)

  const handleSearchClick = async () => {
    if(!inputValue){
      return
    }

    await getSofaByName(inputValue)


  }

  const searchSofa = async (search: string) => {
    try {
      setInputValue(search)
      setSpinner(true)
      const data  = await Api().sofas.searchSofa(search)
      const names = data.rows.map((item) => item.name).map(createSelectOption)
      setOptions(names)

      if(data.count === 0){
        setSpinner(false)
      }
    } catch (e) {
      toast.warning('Произошла неизвестная ошибка')
    } finally {
      setSpinner(false)
    }
  }

  const getSofaByName = async (name: string) => {
    try {
      const data = await Api().sofas.searchSofaByName(name)

      if(!data.id) {
        toast.warning('Товар не найден')
        return
      }

      await router.push(`/catalog/${data.id}`)

    } catch (e) {
      toast.warning('Произошла неизвестная ошибка')
    }
  }

  const onSearchInputChange = (text: string) => {
    delayCallback(() => searchSofa(text))
  }

  return (
    <div>
      <Select components={{NoOptionsMessage: spinner ? NoOptionsSpinner :  NoOptionsMessage }}
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
              onInputChange={onSearchInputChange}
              options = {options}

      />
      <button onClick={handleSearchClick} className={`${styles.searchSvg} ${darkModeClass}`}>
        <SearchSvg/>
      </button>
    </div>
  )
};

