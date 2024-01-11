import React from 'react';
import {toast} from 'react-toastify';
import {useForm} from 'react-hook-form';

import {useLoginMutation} from '../../../store/user/user.api';

import {useAppSelector} from '../../../hooks/redux';

import {isErrorWithMessage} from '../../../utils/is-error-with-message';

import {CreateUserDto, IAuthFrom, IInputs} from '../../../types/auth';

import {NameInput} from '../../elements/Auth/NameInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import {CloseSvg} from '../../elements/CloseSvg/index';

import styles from '../../../styles/authPage/index.module.scss'


export const SignInForm: React.FC<IAuthFrom> = ({setOpen, toggleRegister}) => {

  const [loginUser] = useLoginMutation()
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()
  const [error, setError] = React.useState('')
  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      await loginUser(dto).unwrap()
      toast.success('Вход выполнен!')
      setOpen()
      reset()
    } catch (err) {
      const maybeError = isErrorWithMessage(err)
      if (maybeError) {
        setError(err.data.message)
        toast.error("*Неправильный логин или пароль!")
      } else {
        setError('Произошла неизвестная ошибка')
      }
    }
  }


  React.useEffect(() => {

  }, [error])

  return (
    <div>
      <div className={styles.overlay}>
        <form className={`${styles.signUp} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={`${styles.signUp__title} ${darkModeClass}`}>Вход</h3>
          <span className={styles.error}>{error}</span>
          <div className={styles.form}>
            <NameInput register={register} errors={errors}/>
            <PasswordInput register={register} errors={errors}/>
          </div>
          <button type={'submit'} className={styles.signUp__btn}>
            Войти
          </button>
          <div onClick={setOpen} className={`${styles.close} ${darkModeClass}`}>
            <CloseSvg/>
          </div>
          <div className={`${styles.signUp__register} ${darkModeClass}`}>
            <span>У вас нет аккаунта? </span>
            <span onClick={toggleRegister}>Регистрация</span>
          </div>
        </form>
      </div>
    </div>
  );
};

