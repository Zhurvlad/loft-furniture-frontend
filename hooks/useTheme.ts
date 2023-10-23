import {useAppDispatch, useAppSelector} from './redux';
import {setTheme, themeSlice} from '../store/reducers/ThemeSlice';
import React from 'react';


export const useTheme = () => {
  const {theme} = useAppSelector((state) => state.theme)
  const dispatch = useAppDispatch()

  const toggleTheme = () => {
    if(theme === 'light'){
      localStorage.setItem('theme', 'dark')
      dispatch(themeSlice.actions.setTheme('dark'))
    } else {
      localStorage.setItem('theme', 'light')
      dispatch(themeSlice.actions.setTheme('light'))
    }
  }

  React.useEffect(() => {
    const localTheme = localStorage.getItem('theme')
    document.documentElement.dataset.theme = theme
    if(localTheme){
      dispatch(themeSlice.actions.setTheme(localTheme))
    }
  }, [theme])

  /*React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    /!*localStorage.setItem('theme', theme)*!/
  }, [ theme ])*/


  return {toggleTheme}
}
