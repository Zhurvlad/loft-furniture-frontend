import React from 'react';
import {useForm} from 'react-hook-form';

import {useRegisterMutation} from '../../../store/user/user.api';

import {useAppSelector} from '../../../hooks/redux';

import {isErrorWithMessage} from '../../../utils/is-error-with-message';
import {showAuthError} from '../../../utils/errors';

import {CreateUserDto, IAuthFrom, IInputs} from '../../../types/auth';

import {EmailInput} from '../../elements/Auth/EmailInput';
import {NameInput} from '../../elements/Auth/NameInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import {CloseSvg} from '../../elements/CloseSvg/index';

import styles from '../../../styles/authPage/index.module.scss'


export const SignUpForm: React.FC<IAuthFrom> = ({setOpen, toggleRegister}) => {

  //TODO: Баг при регистрации когда нажамаешь на иконку юзера

  const [registerUser] = useRegisterMutation()
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
      console.log(maybeError, 4234)
      if (maybeError) {
        setError(err.data.message)
        showAuthError(maybeError)
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

