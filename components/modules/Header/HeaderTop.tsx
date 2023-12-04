import React from 'react';
import styles from '../../../styles/header/index.module.scss'
import Link from 'next/link';
import {LocationSvg} from '../../elements/LocationSvg/index';
import {UserSvg} from '../../elements/UserSvg/index';
import {SignInForm} from '../AuthPage/SignInForm';
import {SignUpForm} from '../AuthPage/SignUpForm';
import ProfileDropDown from './ProfileDropDown';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {Api} from '../../../utils/api/index';
import {citySlice} from '../../../store/reducers/CitySlice';
import spinnerStyles from '../../../styles/spinner/index.module.scss'


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

export const HeaderTop = () => {

  const {user} = useAppSelector(state => state.user)
  const {city} = useAppSelector(state => state.city)
  const [open, setOpen] = React.useState(false)
  const [register, setRegister] = React.useState(false)
  const [spinner, setSpinner] = React.useState(false)
  const dispatch = useAppDispatch()


  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const toggleRegister = () => {
    setRegister(!register)
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

  const getCity = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 2000,
      maximumAge: 0
    }

    const success = async (pos: GeolocationPosition) => {
      try {
        setSpinner(true)
        const {longitude, latitude} = pos.coords

        const data = await Api().location.getLocation({longitude, latitude})

        dispatch(citySlice.actions.setCity({
            city: data.features[0].properties.city,
            street: data.features[0].properties.address_line1,
          })
        )

      } catch (e) {
        console.log(e)
      } finally {
        setSpinner(false)
      }
    }


    const error = (error: GeolocationPositionError) => console.log(error)

    navigator.geolocation.getCurrentPosition(success, error, options)
  }


  return (
    <div className={styles.header__top}>
      <div className={'container'}>
        <div className={styles.header__top__inner}>
          <button onClick={getCity} className={styles.city}>
                <span>
                      <LocationSvg/>
                </span>
            <span className={`${styles.city__text} ${darkModeClass}`}>
        {spinner ? (
          <span
            className={spinnerStyles.spinner}
            style={{top: '-2px', left: 10, width: 20, height: 20}}
          />
        ) : city.city?.length ? (
          city.city
        ) : (
          'Город'
        )}
      </span>
          </button>
          <nav className={styles.menu}>
            <ul className={styles.menu__list}>
              <li className={styles.menu__item}>
                <Link href={'/'} legacyBehavior passHref>
                  <a className={styles.menu__link}>Главная</a>
                </Link>
              </li>
              <li className={styles.menu__item}>
                <Link href={'/about'} legacyBehavior passHref>
                  <a className={styles.menu__link}>О нас</a>
                </Link>
              </li>
              <li className={styles.menu__item}>
                <Link href={'/contacts'} legacyBehavior passHref>
                  <a className={styles.menu__link}>Контакты</a>
                </Link>
              </li>
            </ul>
          </nav>
          <div onClick={toggleOpen} className={styles.header__box}>
            <ProfileDropDown/>
          </div>
          {!user && open
            ? register
              ? <SignUpForm setOpen={toggleOpen} toggleRegister={toggleRegister}/>
              : <SignInForm setOpen={toggleOpen} toggleRegister={toggleRegister}/>
            : ''}
        </div>
      </div>
    </div>
  );
};


/*
<div className={styles.header__top}>
  <div className={`container ${styles.header__top__container}`}>

    <div className={styles.header__left}>
      <button className={styles.city}>
                <span>
                      <LocationSvg/>
                </span>
        <span>
                  Москва
                </span>
      </button>
      <nav className={styles.header__left__nav}>
        <ul className={styles.header__left__nav__list}>
          <li className={styles.header__left__nav__list__item}>
            <Link href={'/aboutUs'} legacyBehavior passHref>
              <a className={styles.header__left__nav__list__item__link}>О нас</a>
            </Link>
          </li>
        </ul>
        <ul className={styles.header__left__nav__list}>
          <li className={styles.header__left__nav__list__item}>
            <Link href={'/contacts'} legacyBehavior passHref>
              <a className={styles.header__left__nav__list__item__link}>Контакты</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
    <div className={styles.header__right}>
      <ul className={styles.header__right__nav__list}>
        <li className={styles.header__right__nav__list__item}>
          <a href={'tel:89648999119'} className={styles.header__right__nav__list__item__link}>
                <span>
                  <PhoneSvg/>
                </span>
            8 (964) 89 99 119
          </a>
        </li>
      </ul>
      <ul className={styles.header__right__nav__list}>
        <li className={styles.header__right__nav__list__item}>
          <a className={styles.header__right__nav__list__item__link}>
            <span><DeliverySvg/></span>
            Доставка
          </a>
        </li>
      </ul>
    </div>
  </div>
</div>*/
