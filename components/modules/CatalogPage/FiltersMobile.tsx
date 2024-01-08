import React from 'react';
import {CloseBurgerSvg} from '../../elements/CloseBurgerSvg/index';
import {MainPageSvg} from '../../elements/MainPageSvg/index';
import {AboutUsSvg} from '../../elements/AboutUsSvg/index';
import {ContactsSvg} from '../../elements/ContactsSvg/index';
import {FilterSelect} from './FilterSelect';
import styles from '../../../styles/catalogPage/index.module.scss'


export const FiltersMobile = () => {


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

    return (
     <div>
        <button onClick={toggleBurgerMenu} className={`${styles.filters__mobile__btn} ${openBurgerMenu ? styles.open : ''}`}>
         Фильтры
       </button>
       <div className={`${styles.filters__mobile} ${openBurgerMenu ? styles.filters__mobile__active : ''}`}>
         <div className={styles.filters__mobile__header}>
           <h3 className={styles.filters__mobile__title}>Фильтры</h3>
           <span onClick={closeBurgerMenu}><CloseBurgerSvg /></span>
         </div>
         {/*<ul className={styles.filters__mobile__list}>
           <li className={styles.filters__mobile__item}>
             <a className={styles.filters__mobile__link}>
               <MainPageSvg/>
               <p>Главная</p>
             </a>
           </li>
           <li className={styles.filters__mobile__item}>
             <a className={styles.filters__mobile__link}>
               <AboutUsSvg/>
               <p>О нас</p>
             </a>
           </li>
           <li className={styles.filters__mobile__item}>
             <a className={styles.filters__mobile__link}>
               <ContactsSvg/>
               <p>Контакты</p>
             </a>
           </li>
         </ul>
         <div className={styles.filters__mobile__header}>
           <h3 className={styles.filters__mobile__title}>Меню</h3>
         </div>
         <ul className={styles.filters__mobile__list}>
           штото
         </ul>*/}
       </div>
     </div>
    );
};

