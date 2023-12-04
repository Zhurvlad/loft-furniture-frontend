import React from 'react';
import styles from '../../../styles/authPage/index.module.scss'
import {NameInput} from '../../elements/Auth/NameInput';
import {PasswordInput} from '../../elements/Auth/PasswordInput';
import {CloseSvg} from '../../elements/CloseSvg/index';
import {useAppDispatch, useAppSelector} from '../../../hooks/redux';
import {useForm} from 'react-hook-form';
import {CreateUserDto, IAuthFrom, IInputs} from '../../../types/auth';
import {useLoginMutation} from '@/store/user/user.api';
import {isErrorWithMessage} from '../../../utils/is-error-with-message';
import {showAuthError} from '../../../utils/errors';
import {HTTPStatus} from '../../../constans/index';
import {toast} from 'react-toastify';


export const SignInForm: React.FC<IAuthFrom> = ({setOpen, toggleRegister}) => {


  const [loginUser, loginUserResult] = useLoginMutation()
  const {register, formState: {errors}, handleSubmit, reset} = useForm<IInputs>()
  const [error, setError] = React.useState('')
  const {theme} = useAppSelector((state) => state.theme)
  const darkModeClass = theme === 'dark' ? `${styles.dark_mode}` : ''

  console.log(loginUserResult, 9898989)

  const onSubmit = async (dto: CreateUserDto) => {
    try {
      await loginUser(dto).unwrap()
      setOpen()
      reset()
    } catch (err) {


      const maybeError = isErrorWithMessage(err)
      if(maybeError){
        setError(err.data.message)
        toast.error((error as Error).message)
      } else {
        setError('Произошла неизвестная ошибка')
      }
    }
  }

  console.log(error, 8989)

  React.useEffect(() => {

  }, [error])

  const err = () =>  toast.error((error as Error).message)


  const notify = () => toast("Hello coders it was easy!");
 /* console.log(errors)*/

  return (
    <div>


      <div className={styles.overlay}>
        <button onClick={notify}>Click me!</button>
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

