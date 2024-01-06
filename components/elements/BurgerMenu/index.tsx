import React from 'react';
import styles from '../../../styles/header/index.module.scss';
import {useAppSelector} from '../../../hooks/redux';

export const BurgerMenu = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false)

const toggleBurgerMenu = () => {
  setOpenBurgerMenu(!openBurgerMenu)
  window.scrollTo(0,0)
  document.querySelector('.overlay')?.classList.toggle('open')
  document.querySelector('.body')?.classList.toggle('overflow-hidden')
}

const closeBurgerMenu = () => {
  setOpenBurgerMenu(false)
  document.querySelector('.overlay')?.classList.remove('open')
  document.querySelector('.body')?.classList.remove('overflow-hidden')
}

React.useEffect(() => {
  const overlay = document.querySelector('.overlay')

  overlay?.addEventListener('click', closeBurgerMenu)


  return () => overlay?.removeEventListener('click', closeBurgerMenu)
}, [openBurgerMenu])

    return (
      <button onClick={toggleBurgerMenu} className={`${styles.burger_menu} ${openBurgerMenu ? styles.open : ''} ${darkModeClass}`}>
        <span></span>
        <span></span>
        <span></span>
      </button>
    );
};

