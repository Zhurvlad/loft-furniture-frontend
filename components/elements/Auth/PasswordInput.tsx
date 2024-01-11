import React, {FC} from 'react';
import {useAppSelector} from '../../../hooks/redux';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/authPage/index.module.scss'

export const PasswordInput: FC<IAuthInput> = ({errors, register}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''


  return (
    <label className={styles.signUp__inner}>
      <p className={`${styles.signUp__input__title} ${darkModeClass}`}>Пароль</p>
      <input className={`${styles.signUp__input} ${styles.signUp__input__password} ${darkModeClass}`}
             type="text" name={'Password'}
             placeholder={'Введите свой пароль'}
             {...register("password", {
               required: "Введите пароль!",
               minLength: 8,
               maxLength: 20,
               pattern: {
                 value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                 message: 'Пароль должен содержать хотя бы одну латинскую букву или цифру!'
               }
             })}
      />
      {errors.password && <span className={styles.error_alert}>{errors.password.message}</span>}
      {errors.password && errors.password.type === 'minLength' &&
      <span className={styles.error_alert}>Минимум 8 символов!</span>}
      {errors.password && errors.password.type === 'maxLength' &&
      <span className={styles.error_alert}>Максимум 20 символов!</span>}

    </label>
  );
};

