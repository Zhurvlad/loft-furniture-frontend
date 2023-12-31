import React, {FC} from 'react';

import {useAppSelector} from '../../../hooks/redux';

import {IAuthInput} from '../../../types/auth';

import styles from '../../../styles/authPage/index.module.scss';

export const EmailInput: FC<IAuthInput> = ({errors, register}) => {

  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  return (
    <label className={styles.signUp__inner}>
      <p className={`${styles.signUp__input__title} ${darkModeClass}`}>E-mail адрес</p>
      <input className={`${styles.signUp__input} ${darkModeClass}`}
             name={'Email'} type="text"
             placeholder={'Введите свой E-mail'}
             {...register("email", {
               required: "Введите email!",
               pattern: {
                 value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                 message: 'Непривильный email'
               }
             })}
      />
      {errors.email && <span className={styles.error_alert}>{errors.email?.message}</span>}

    </label>
  );
};

