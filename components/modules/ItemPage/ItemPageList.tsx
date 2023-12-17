import React from 'react';

import {ISofa} from '../../../models/ISofas';

import {ItemImagesItem} from './ItemImagesItem';

import styles from '../../../styles/itemPage/index.module.scss'


export interface ItemPageListProps {
  sofaItem: ISofa
}


export const ItemPageList: React.FC<ItemPageListProps> = ({sofaItem}) => {

  const images = sofaItem.images ? JSON.parse(sofaItem.images) : []
  const [currentImgSrc, setCurrentImgSrc] = React.useState('')

  return (
    <div className={styles.item__images}>
      <div className={styles.item__images__main}>
        <img src={currentImgSrc || images[0]} alt={sofaItem.name}/>
      </div>
      <ul className={styles.item__images__list}>{images.map((item, i) =>
        <ItemImagesItem key={i} alt={`image-${i + 1}`} src={item} callback={setCurrentImgSrc}/>)}</ul>
    </div>
  );
};

