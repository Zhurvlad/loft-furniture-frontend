import React, {FC} from 'react';
import styles from '../../../styles/authPage/index.module.scss';
import {IAuthInput} from '../../../types/auth';
import {useAppSelector} from '../../../hooks/redux';

export const NameInput:FC<IAuthInput> = ({errors, register}) => {
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
                 value: /^[a-zA-Z]+[a-zA-Z]+$/,
                 message: 'Непривильное имя'
               }
             })}
      />
      {errors.name && <span className={styles.error_alert}>{errors.name?.message}</span>}
      {errors.name && errors.name.type === 'minLength' && <span className={styles.error_alert}>Минимум 4 символа!</span>}
      {errors.name && errors.name.type === 'maxLength' && <span className={styles.error_alert}>Максимум 16 символов!</span>}
    </label>
  );
};

