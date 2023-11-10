import React from 'react';
import styles from '../../../styles/catalogPage/index.module.scss';
import {CheckboxSvg} from '../CheckboxSvg/index';
import {useAppSelector} from '../../../hooks/redux';

export interface BrandInputProps {
  activeManufacturer: string[],
  handleActiveManufacturer: (manufacturer: string) => void,
  manufacturer: string
}

export const BrandInput:React.FC<BrandInputProps> = ({handleActiveManufacturer, activeManufacturer, manufacturer}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


    return (
      <div  className={styles.filters__brand} key={manufacturer}>
        <label className={`${styles.filters__brand__text} ${darkModeClass}`}>
          <input onClick={() => handleActiveManufacturer(manufacturer)} className={`${styles.filters__brand__checkbox} ${styles.active}`} type="checkbox"/>{manufacturer}
          {activeManufacturer.find(i => i === manufacturer) && <span className={styles.filters__color__checkbox__span}><CheckboxSvg/></span>}
        </label>
      </div>
    );
};

