import React from 'react';
import styles from '../../../styles/catalogPage/index.module.scss';
import {CheckboxSvg} from '../CheckboxSvg/index';
import {useAppSelector} from '../../../hooks/redux';

export const ColorEl = ({toggleActiveColor, item, activeColor}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''
  const activeColorCss = activeColor.find(i => i === item.colorName) ? `${styles.active__color}` : ''

  console.log(activeColor.find(i => i === item.hex) ? `${styles.active__color}` : '')

  return (
    <div onClick={() => toggleActiveColor(item.colorName)} className={styles.checkbox__color}>
      <input
        style={{backgroundColor: `${item.hex}`}}
        className={`${styles.filters__color__checkbox} ${darkModeClass} ${activeColorCss}`}
        type="checkbox"/>
        <p className={`${styles.color__name} ${darkModeClass} ${activeColorCss}`}>{item.colorNameRu}</p>
      {/*{activeColor.find(i => i === item.hex) && <span className={styles.filters__color__checkbox__span}>
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
        <path d="M2 4.35294L4.64706 7L9.64706 2" stroke={item.colorName ==='black' ? 'white' : 'black'} strokeWidth="2" strokeLinecap="square"/>
      </svg>
        </span>}*/}
    </div>
  );
};

