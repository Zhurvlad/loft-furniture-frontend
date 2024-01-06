import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';

import {SignInForm} from '../AuthPage/SignInForm';
import {SignUpForm} from '../AuthPage/SignUpForm';
import ProfileDropDown from './ProfileDropDown';

import styles from '../../../styles/header/index.module.scss'
import {CityButton} from '../../elements/CityButton/index';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {UserProfile} from './UserProfile';

const headerRef = [
  {id: 1, name: 'Главная', ref: '/'},
  {id: 2, name: 'О нас', ref: '/about'},
  {id: 3, name: 'Контакты', ref: '/contacts'},
]

export interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export interface GeolocationPosition {
  coords: GeolocationCoordinates;
  timestamp: number;
}

export interface GeolocationPositionError {
  code: number;
  message: string;
}

export const HeaderTop: React.FC = () => {

  const isMedia768 = useMediaQuery(768)

  const [openBurgerMenu, setOpenBurgerMenu] = React.useState(false)

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

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
    <div className={styles.header__top}>
      <div className={'container'}>
        <div className={styles.header__top__inner}>
          {!isMedia768 && <CityButton darkModeClass={darkModeClass}/>}
          {isMedia768
          &&
          <button onClick={toggleBurgerMenu} className={`${styles.burger_menu} ${openBurgerMenu ? styles.open : ''} ${darkModeClass}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>}
          <nav className={`${styles.menu} ${openBurgerMenu ? styles.open : ''}`}>
            <ul className={styles.menu__list}>
              {headerRef.map((i) =>
                <li key={i.id} className={styles.menu__item}>
                  <Link href={i.ref} legacyBehavior passHref>
                    <a>{i.name}</a>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
          <UserProfile/>
        </div>
      </div>
    </div>
  );
};

