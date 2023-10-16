import React from 'react';
import styles from '../../../styles/header/index.module.scss'
import {LogoSvg} from '../../elements/LogoSvg/index';
import Link from 'next/link';
import {SearchSvg} from '../../elements/SearchSvg/index';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {CartSvg} from '../../elements/CartSvg/index';
import {SearchInput} from '../../elements/SearchInput/index';

import {ThemeToggle} from '../../elements/ThemeToggler/index';
import {useAppSelector} from '../../../hooks/redux';


export const HeaderBottom = () => {

  const {theme} = useAppSelector((state) => state.themeReducer)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  return (
    <div className={styles.header__bottom}>
      <div className="container">
        <div className={styles.header__bottom__inner}>
          <div className={`${styles.logo} ${darkModeClass}`}>
            <Link href={'/'} legacyBehavior passHref>
              <a>
                <LogoSvg/>
              </a>
            </Link>
          </div>

          <div className={styles.search}>
            <SearchInput/>
            <button className={`${styles.searchSvg} ${darkModeClass}`}>
                <SearchSvg/>{/**/}
            </button>
          </div>

          <div className={styles.header__box}>
            <ul className={styles.user__list}>
              <ThemeToggle/>
              <li className={`${styles.user__list__item} ${darkModeClass}`}>
                <Link href={''} passHref legacyBehavior>
                  <a className={styles.basket}>
                    <FavoriteSvg/>
                    <p className={styles.basket__num}>12</p>
                  </a>
                </Link>
              </li>
              <li className={`${styles.user__list__item} ${darkModeClass}`}>
                <Link href={''} passHref legacyBehavior>
                  <a className={styles.basket}>
                    <CartSvg/>
                    <p className={styles.basket__num}>12</p>
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


/*https://youtu.be/qK1ENlEucpc?t=19654*/
