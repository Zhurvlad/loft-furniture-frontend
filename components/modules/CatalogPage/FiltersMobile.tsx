import React from 'react';

import {CloseBurgerSvg} from '../../elements/CloseBurgerSvg/index';

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
       </div>
     </div>
    );
};

