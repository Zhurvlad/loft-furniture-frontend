import React, {FC} from 'react';
import styles from '../../../styles/authPage/index.module.scss'
import {IAuthInput} from '../../../types/auth';
import {useAppSelector} from '../../../hooks/redux';

export const PasswordInput: FC<IAuthInput> = ({errors, register}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.signUp__inner}>
      <p className={`${styles.signUp__input__title} ${darkModeClass}`}>Password</p>
      <input className={`${styles.signUp__input} ${darkModeClass}`}
             type="text" name={'Password'}
             placeholder={'Insert your password'}
             {...register("password", {
               required: "Введите пароль!",
               minLength: 8,
               maxLength: 20,
               pattern: {
                 value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                 message: 'Пароль должен содержать хотя бы одну латинскую букву или цифру'
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

