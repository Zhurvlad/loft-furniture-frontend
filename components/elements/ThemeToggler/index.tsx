import cn from 'classnames'
import styles from '../../../styles/theme/index.module.scss'
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useDispatch} from 'react-redux';
import React from 'react';
import {setTheme} from '../../../store/reducers/ThemeSlice';
import {useTheme} from '../../../hooks/useTheme';


export const ThemeToggle = ({className}) => {

  const {theme} = useAppSelector((state) => state.themeReducer)

  const dispatch = useAppDispatch()
  const {toggleTheme} = useTheme()



  const handleChange = () => {
    toggleTheme()
    document.body.classList.toggle('dark_mode')
  }

  React.useEffect(() => {
    document.body.classList.add(theme === 'dark' ? 'dark_mode' : 'body')
  }, [theme])

  /*console.log(document.body.classList)*/

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
