import cn from 'classnames'
import styles from '../../../styles/theme/index.module.scss'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useDispatch} from 'react-redux';
import React from 'react';
import {setTheme} from '../../../store/reducers/ThemeSlice';

export const ThemeToggle = ({className}) => {

  const {theme} = useAppSelector((state) => state.themeReducer)

  const dispatch = useAppDispatch()

  React.useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [ theme ])

  const handleChange = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    dispatch(setTheme(next))
  }

  return (
    <div
      className={cn(
        className,
        styles.theme,
        theme === 'light' ?  styles.light : styles.dark)}
      onClick={handleChange}
    />
  )
}
