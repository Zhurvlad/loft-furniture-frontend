import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';

import {LogoSvg} from '../../elements/LogoSvg/index';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {CartSvg} from '../../elements/CartSvg/index';
import {SearchInput} from '../../elements/SearchInput/index';
import {ThemeToggle} from '../../elements/ThemeToggler/index';

import styles from '../../../styles/header/index.module.scss'


export const HeaderBottom:React.FC = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const {item} = useAppSelector(state => state.cart)

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
                <Link href={'/cart'} passHref legacyBehavior>
                  <a className={styles.basket}>
                    <CartSvg/>
                    {item?.length !== 0 ? <p className={styles.basket__num}>{item?.length}</p> : ''}
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


