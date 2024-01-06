import React from 'react';
import {useMediaQuery} from '../../../hooks/useMediaQuery';

import {HeaderTop} from './HeaderTop';
import {HeaderBottom} from './HeaderBottom';

import styles from '../../../styles/header/index.module.scss'

export const Header:React.FC = () => {

  const isMedia768 = useMediaQuery(768)

    return (
        <header>
          {!isMedia768 && <HeaderTop/>}
          <HeaderBottom/>
        </header>
    );
};

