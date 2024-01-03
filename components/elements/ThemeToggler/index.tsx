import React from 'react';
import cn from 'classnames'

import {useAppSelector} from '../../../hooks/redux';
import {useTheme} from '../../../hooks/useTheme';

import styles from '../../../styles/theme/index.module.scss'


export const ThemeToggle = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const {toggleTheme} = useTheme()

  const handleChange = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  React.useEffect(() => {
    document.body.classList.add(theme === 'dark' ? 'dark_mode' : 'body')
  }, [theme])

  return (
    <div
      className={cn(
        styles.theme,
        theme === 'light' ? styles.light : styles.dark)}
      onClick={handleChange}
    />
  )
}
