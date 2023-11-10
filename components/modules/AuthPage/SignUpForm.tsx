import React from 'react';
import styles from '../../../styles/authPage/index.module.scss'
import {CloseSvg} from '../../elements/CloseSvg/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useForm} from 'react-hook-form';
import {CreateUserDto, IAuthFrom, IInputs} from '../../../types/auth';
import {EmailInput} from '../../elements/Auth/EmailInput';
import {NameInput} from '../../elements/Auth/NameInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import axios from 'axios';
import {registerUser} from '../../../store/reducers/AuthActions';
import { useRegisterMutation } from '@/store/user/user.api';
import {isErrorWithMessage} from '../../../utils/is-error-with-message';


export const SignUpForm: React.FC<IAuthFrom> = ({setOpen, toggleRegister}) => {

  const dispatch = useAppDispatch()

  const [registerUser, registerUserResult] = useRegisterMutation()
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()
  const [error, setError] = React.useState('')

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      await registerUser(dto).unwrap()
      setOpen()
      reset()
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if(maybeError){
        setError(err.data.message)
      } else {
        setError('Произошла неизвестная ошибка')
      }
    }
  }

  return (
    <div>
      <div className={styles.overlay}>
        <form className={`${styles.signUp} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={`${styles.signUp__title} ${darkModeClass}`}>Регистрация</h3>
          <span className={styles.error}>{error}</span>
          <NameInput register={register} errors={errors}/>
          <EmailInput register={register} errors={errors}/>
          <PasswordInput register={register} errors={errors}/>

          <button type={'submit'} className={styles.signUp__btn}>
            Зарегестрироваться
          </button>
          <div onClick={setOpen} className={`${styles.close} ${darkModeClass}`}>
            <CloseSvg/>
          </div>
          <div className={`${styles.signUp__register} ${darkModeClass}`}>
            <span>У вас есть аккаунт? </span>
            <span onClick={toggleRegister}>Войти</span>
          </div>
        </form>
      </div>
    </div>
  );
};

