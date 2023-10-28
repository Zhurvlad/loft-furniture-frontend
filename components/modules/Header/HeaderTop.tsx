import React from 'react';
import styles from '../../../styles/header/index.module.scss'
import Link from 'next/link';
import {LocationSvg} from '../../elements/LocationSvg/index';
import {UserSvg} from '../../elements/UserSvg/index';
import {SignUpFrom} from '../AuthPage/SignUpForm';
import {SignInForm} from '../AuthPage/SignInForm';


export const HeaderTop = () => {

  const [open, setOpen] = React.useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  return (
    <div  className={styles.header__top}>
      <div className={'container'}>
        <div className={styles.header__top__inner}>
          <button className={styles.city}>
                <span>
                      <LocationSvg/>
                </span>
            <span>Москва</span>
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
            <button>
              <span>
                <UserSvg/>
              </span>
            </button>
          </div>
          {open && <SignInForm setOpen={toggleOpen}/>}
          {/*{!open && <SignInForm setOpen={toggleOpen}/>}*/}
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
