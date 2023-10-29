import React from 'react';
import styles from '../../../styles/mainPage/index.module.scss';
import {FavoriteSvg} from '../../elements/FavoriteSvg/index';
import {SalesSvg} from '../../elements/SalesSvg/index';
import {TopSalesItem} from './TopSalesItem';
import {useAppSelector} from '../../../hooks/redux';
import {sofasSelector} from '../../../store/reducers/SofasSlice';
import skeletonStyles from '../../../styles/skeletonStyles/index.module.scss'

import {sofaApi} from '../../../store/sofa/sofa.api';
import {ISofas} from '../../../models/ISofas';

//TODO: Разобраться с типизацией

export const TopSales = () => {

 /* const {sofas , isLoading} = useAppSelector(sofasSelector)*/
  const {data:sofas, isLoading, error} = sofaApi.useGetSofasQuery(12)
  const {theme} = useAppSelector((state) => state.theme)


  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const sofaItem = sofas  as ISofas

    return (
      <div className={styles.main__top_sales}>
        <h2 className={`${styles.main__top_sales__title} ${darkModeClass}`}>
          Хиты продаж
        </h2>
        {isLoading
          ? (
            <ul className={skeletonStyles.skeleton}>
              {Array.from(new Array(20)).map((i, index) => (
                <li
                  className={`${skeletonStyles.skeleton__item} ${theme === 'dark' ? `${skeletonStyles.dark_mode}` : ''}`}
                  key={index}>
                  <div className={skeletonStyles.skeleton__item__light}/>
                </li>
              ))}
            </ul>
          ) : (
            <div className={styles.main__top_sales__inner}>
              {sofas && sofaItem.rows.map(i => (
                <TopSalesItem sofa={i} key={i.id}/>
              ))}
            </div>
          )}
      </div>
    );
};

