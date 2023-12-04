

import React from 'react';
import {Header} from '../modules/Header/Header';
import {Footer} from '../modules/Footer/Footer';

export const MainLayout = ({children} : {children : React.ReactNode}) => {
    return (
        <>
          <Header/>
          {children}
            <Footer/>
        </>
    );
};

