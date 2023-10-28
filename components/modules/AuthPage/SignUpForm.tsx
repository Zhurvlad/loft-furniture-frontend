import React from 'react';
import styles from '../../../styles/authPage/index.module.scss'
import {CloseSvg} from '../../elements/CloseSvg/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useForm} from 'react-hook-form';
import {IInputs} from '../../../types/auth';
import {EmailInput} from '../../elements/Auth/EmailInput';
import {NameInput} from '../../elements/Auth/NameInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import {CreateUserDto} from '../../../utils/api/types';
import {UserApi} from '../../../utils/api';
import {setUserData} from '../../../store/reducers/UserSlice'
import axios from 'axios';
import {registerUser} from '../../../store/reducers/AuthActions';


export const SignUpFrom = ({setOpen}) => {

  const dispatch = useAppDispatch()
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      console.log(dto)

      const {data} = await axios.post('http://localhost:3002/auth/signup', dto)
      console.log(data)
      dispatch(registerUser(data))

      setOpen()
      reset()
    } catch (e) {

    }
  }

  return (
    <div>
      <div className={styles.overlay}>
        <form className={`${styles.signUp} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={`${styles.signUp__title} ${darkModeClass}`}>Регистрация</h3>

          <NameInput  register={register} errors={errors}/>
          <EmailInput register={register} errors={errors}/>
          <PasswordInput register={register} errors={errors}/>

          <button type={'submit'} className={styles.signUp__btn}>
            Sign Up
          </button>
          <div onClick={setOpen} className={`${styles.close} ${darkModeClass}`}>
            <CloseSvg/>
          </div>
          <div className={`${styles.signUp__register} ${darkModeClass}`}>
            <span>You have an account? </span>
            <span onClick={setOpen}>LogIn</span>
          </div>
        </form>
      </div>
    </div>
  );
};

