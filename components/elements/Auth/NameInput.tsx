import React, {FC} from 'react';

import {useAppSelector} from '../../../hooks/redux';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/authPage/index.module.scss';

export const NameInput: FC<IAuthInput> = ({errors, register}) => {
  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.signUp__inner}>
      <p className={`${styles.signUp__input__title} ${darkModeClass}`}>Ваше имя</p>
      <input className={`${styles.signUp__input} ${darkModeClass}`}
             type="text"
             placeholder={'Введите ваше имя'}
             name={'username'}
             {...register("username", {
               required: "Введите имя!",
               minLength: 4,
               maxLength: 16,
               pattern: {
                 value: /^[a-zA-Z0-9]+$/,
                 message: 'Непривильное имя'
               }
             })}
      />
      {errors.username && <span className={styles.error_alert}>{errors.username?.message}</span>}
      {errors.username && errors.username.type === 'minLength' &&
      <span className={styles.error_alert}>Минимум 4 символа!</span>}
      {errors.username && errors.username.type === 'maxLength' &&
      <span className={styles.error_alert}>Максимум 16 символов!</span>}
    </label>
  );
};

