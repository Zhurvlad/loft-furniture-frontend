import React from 'react';
import styles from '../../../styles/mainPage/index.module.scss'
import {KitchenSvg} from '../../elements/KitchenSvg/index';
import {BedsSvg} from '../../elements/BedsSvg/index';
import {SofaSvg} from '../../elements/SofaSvg/index';
import {WardrobeSvg} from '../../elements/WardobeSvg/index';
import {OfficeFurnitureSvg} from '../../elements/OfficeFurnitureSvg/index';
import {ChildrenRoomSvg} from '../../elements/ChildrenRoomSvg/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {MainSlider} from '../../modules/MainPage/MainSlider';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import {sofasSelector} from '../../../store/reducers/SofasSlice';
import {TopSales} from '../../modules/MainPage/TopSales';


export const MainPage = () => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  return (
    <section className={styles.main}>
      <div className="container">
        <div className={styles.categories}>
          <ul className={styles.menu__categories}>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><KitchenSvg/></span>
                Кухни
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><BedsSvg/></span>
                Кровати
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><SofaSvg/></span>
                Диваны
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><WardrobeSvg/></span>
                Шкафы
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><OfficeFurnitureSvg/></span>
                Офисная мебель
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                <span><ChildrenRoomSvg/></span>
                Детские
              </a>
            </li>
            <li className={styles.menu__categories__item}>
              <a href="#" className={`${styles.menu__categories__link} ${darkModeClass}`}>
                Акции
              </a>
            </li>
          </ul>
        </div>
        <div className={styles.main__slider}>
          <MainSlider/>
        </div>
        <TopSales/>
      </div>
    </section>
  );
};

