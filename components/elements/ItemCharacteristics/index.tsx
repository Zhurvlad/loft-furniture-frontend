import React from 'react';

import {SofaInfo} from '../../../utils/sofaInfo';

import styles from '../../../styles/itemPage/index.module.scss';

export type  ItemCharacteristicsProps = {
  darkModeClass: string
}

export const ItemCharacteristics:React.FC<ItemCharacteristicsProps> = ({ darkModeClass}) => {


    return (
      <div className={`${styles.item__characteristics} ${darkModeClass}`}>
        <p className={`${styles.item__characteristics__title} ${darkModeClass}`}>Характеристики</p>
        <div className={styles.item__characteristics__inner}>
          {SofaInfo.map((item) =>
            <div key={item.id}>
              <div className={`${styles.cart__details__count} ${darkModeClass}`}>
                <p >{item.infoName}</p>
                <div/>
                <p className={styles.cart__details__info}>{item.value}</p>
              </div>
            </div>)}
        </div>
      </div>
    );
};

