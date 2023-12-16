import React from 'react';

import styles from '../../../styles/itemPage/index.module.scss'

export interface ItemImagesItemProps {
  src: string,
  callback: (arg: string) => void,
  alt: string
}

export const ItemImagesItem:React.FC<ItemImagesItemProps> = ({src, callback, alt}) => {


  const changeMainSrc = () => callback(src)

    return (
        <li  className={styles.item__images__list__item} onClick={changeMainSrc}>
          <img src={src} alt={alt}/>
        </li>
    );
};

