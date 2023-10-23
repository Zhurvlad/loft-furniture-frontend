import React from 'react';
import styles from '../../../styles/mainPage/index.module.scss';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import {TopSalesItem} from './TopSalesItem';
import {useAppSelector} from '../../../hooks/redux';
import {sofasSelector} from '../../../store/reducers/SofasSlice';

export const TopSales = () => {

  const {sofas} = useAppSelector(sofasSelector)
  const {theme} = useAppSelector((state) => state.theme)

  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


    return (
      <div className={styles.main__top_sales}>
        <h2 className={`${styles.main__top_sales__title} ${darkModeClass}`}>
          Хиты продаж
        </h2>
        <div className={styles.main__top_sales__inner}>
          {sofas && sofas.rows?.map(i => (
           <TopSalesItem sofa={i} spinner={true}/>
          ))}
        </div>
      </div>
    );
};

