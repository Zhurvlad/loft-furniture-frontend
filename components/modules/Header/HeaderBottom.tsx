import React from 'react';
import Link from 'next/link';

import {useAppSelector} from '../../../hooks/redux';

import {LogoSvg} from '../../elements/LogoSvg/index';
import {CartSvg} from '../../elements/CartSvg/index';
import {SearchInput} from '../../elements/SearchInput/index';
import {ThemeToggle} from '../../elements/ThemeToggler/index';

import styles from '../../../styles/header/index.module.scss'
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import {UserProfile} from './UserProfile';
import {MobileLogo} from '../../elements/MobileLogo/index';
import {KitchenSvg} from '../../elements/KitchenSvg/index';
import {CloseBurgerSvg} from '../../elements/CloseBurgerSvg/index';
import {MainPageSvg} from '../../elements/MainPageSvg/index';
import {AboutUsSvg} from '../../elements/AboutUsSvg/index';
import {ContactsSvg} from '../../elements/ContactsSvg/index';
import {BedsSvg} from '../../elements/BedsSvg/index';
import {SofaSvg} from '../../elements/SofaSvg/index';
import {WardrobeSvg} from '../../elements/WardobeSvg/index';
import {OfficeFurnitureSvg} from '../../elements/OfficeFurnitureSvg/index';
import {ChildrenRoomSvg} from '../../elements/ChildrenRoomSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';


const categoryItem = [
  {id: 1, svg: <KitchenSvg/>, name: 'Кухни', route: '/catalog'},
  {id: 2, svg: <BedsSvg/>, name: 'Кровати', route: '/catalog'},
  {id: 3, svg: <SofaSvg/>, name: 'Диваны', route: '/catalog'},
  {id: 4, svg: <WardrobeSvg/>, name: 'Шкафы', route: '/catalog'},
  {id: 5, svg: <OfficeFurnitureSvg/>, name: 'Офисная мебель', route: '/catalog'},
  {id: 6, svg: <ChildrenRoomSvg/>, name: 'Детские', route: '/catalog'},
  {id: 7, svg: <SalesSvg/>, name: 'Акции', route: '/catalog'},
]

export const HeaderBottom: React.FC = () => {

  const isMedia768 = useMediaQuery(768)
  const isMedia600 = useMediaQuery(600)


  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const {item} = useAppSelector(state => state.cart)

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
    <div className={styles.header__bottom}>
      <div className="container">

        <div className={styles.header__bottom__inner}>
          {isMedia768 && <button onClick={toggleBurgerMenu} className={`${styles.burger_menu} ${openBurgerMenu ? styles.open : ''} ${darkModeClass}`}>
            <span></span>
            <span></span>
            <span></span>
          </button>}
          <div className={`${styles.logo} ${darkModeClass}`}>
            <Link href={'/'} legacyBehavior passHref>
              <a>
                {isMedia600
                  ?
                  <MobileLogo/>
                  :
                  <LogoSvg/>}
              </a>
            </Link>
          </div>
          {isMedia600
            ?
            ''
            :
            <div className={styles.search}>
              <SearchInput/>
            </div>}
          <div className={styles.header__box}>
            <ul className={styles.user__list}>
              <ThemeToggle/>
              {/* <li className={`${styles.user__list__item} ${darkModeClass}`}>
                  <Link href={''} passHref legacyBehavior>
                    <a className={styles.basket}>
                      <FavoriteSvg/>
                      <p className={styles.basket__num}>12</p>
                    </a>
                  </Link>
                </li>*/}
              <li className={`${styles.user__list__item} ${darkModeClass}`}>
                <Link href={'/cart'} passHref legacyBehavior>
                  <a className={styles.basket}>
                    <CartSvg/>
                    {item?.length !== 0 ? <p className={styles.basket__num}>{item?.length}</p> : ''}
                  </a>
                </Link>
              </li>
              {isMedia768 && <UserProfile/>}
            </ul>
          </div>
        </div>
        <div className={`${styles.menu__mobile} ${openBurgerMenu ? styles.menu__mobile__active : ''}`}>
          <div className={styles.menu__mobile__header}>
            <h3 className={styles.menu__mobile__title}>Меню</h3>
            <span onClick={closeBurgerMenu}><CloseBurgerSvg /></span>
          </div>
          <ul className={styles.menu__mobile__list}>
            <li className={styles.menu__mobile__item}>
              <a className={styles.menu__mobile__link}>
                <MainPageSvg/>
                <p>Главная</p>
              </a>
            </li>
            <li className={styles.menu__mobile__item}>
              <a className={styles.menu__mobile__link}>
                <AboutUsSvg/>
                <p>О нас</p>
              </a>
            </li>
            <li className={styles.menu__mobile__item}>
              <a className={styles.menu__mobile__link}>
                <ContactsSvg/>
                <p>Контакты</p>
              </a>
            </li>
          </ul>
          <div className={styles.menu__mobile__header}>
            <h3 className={styles.menu__mobile__title}>Меню</h3>
          </div>
          <ul className={styles.menu__mobile__list}>
            {categoryItem.map((item) => (
              <li key={item.id} className={styles.menu__mobile__item}>
                <a className={styles.menu__mobile__link}>
                  {item.svg}
                  <p>{item.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {isMedia600
          ?
          <div className={styles.search}>
            <SearchInput/>
          </div>
          :
          ''}
      </div>
    </div>
  );
};


