import React from 'react';
import {HeaderTop} from './HeaderTop';
import {HeaderBottom} from './HeaderBottom';
import {useMediaQuery} from '../../../hooks/useMediaQuery';
import styles from '../../../styles/header/index.module.scss'

export const Header = () => {

  const isMedia950 = useMediaQuery(768)

    return (
        <header className={styles.header}>
          <HeaderTop/>
          <HeaderBottom/>
        </header>
    );
};

