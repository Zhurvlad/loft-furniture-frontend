import React from 'react';

import {useAppSelector} from '../../../hooks/redux';

import {SignUpForm} from '../AuthPage/SignUpForm';
import {SignInForm} from '../AuthPage/SignInForm';
import ProfileDropDown from './ProfileDropDown';

import styles from '../../../styles/header/index.module.scss';

export const UserProfile = () => {



  const {user} = useAppSelector(state => state.user)
  const [open, setOpen] = React.useState(false)
  const [register, setRegister] = React.useState(false)

  const toggleRegister = () => {
    setRegister(!register)
  }

  const toggleOpen = () => {
    setOpen(!open)
  }

    return (
        <div>
          <div onClick={toggleOpen} className={styles.header__box}>
            <ProfileDropDown/>
          </div>
          {!user && open
            ? register
              ? <SignUpForm setOpen={toggleOpen} toggleRegister={toggleRegister}/>
              : <SignInForm setOpen={toggleOpen} toggleRegister={toggleRegister}/>
            : ''}
        </div>
    );
};

