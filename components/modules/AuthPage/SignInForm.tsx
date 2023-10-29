import React from 'react';
import styles from '../../../styles/authPage/index.module.scss'
import {NameInput} from '../../elements/Auth/NameInput';
import {EmailInput} from '../../elements/Auth/EmailInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import {CloseSvg} from '../../elements/CloseSvg/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useForm} from 'react-hook-form';
import {CreateUserDto, IAuthFrom, IInputs} from '../../../types/auth';
import axios from 'axios';
import {registerUser} from '../../../store/reducers/AuthActions';
import {useLoginMutation} from '@/store/user/user.api';


export const SignInForm: React.FC<IAuthFrom> = ({setOpen, toggleRegister}) => {

  const dispatch = useAppDispatch()
  const [loginUser, loginUserResult] = useLoginMutation()
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()

  const [form, setForm] = React.useState(false)

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      await loginUser(dto).unwrap()
      setOpen()
      reset()
    } catch (e) {

    }
  }

  console.log(loginUserResult)

  return (
    <div>
      <div className={styles.overlay}>
        <form className={`${styles.signUp} ${darkModeClass}`} onSubmit={handleSubmit(onSubmit)}>
          <h3 className={`${styles.signUp__title} ${darkModeClass}`}>Вход</h3>
          <NameInput register={register} errors={errors}/>
          <PasswordInput register={register} errors={errors}/>
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

