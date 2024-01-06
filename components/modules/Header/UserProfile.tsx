import React from 'react';
import styles from '../../../styles/header/index.module.scss';
import ProfileDropDown from './ProfileDropDown';
import {SignUpForm} from '../AuthPage/SignUpForm';
import {SignInForm} from '../AuthPage/SignInForm';
import {useAppSelector} from '../../../hooks/redux';

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

