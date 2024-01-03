import {AxiosError} from 'axios';
import {HTTPStatus} from '../constans/index';
import {toast} from 'react-toastify';


export const showAuthError = (error: unknown) => {
  const axiosError = error as AxiosError

  if(axiosError.response){
    if(axiosError.response.status === HTTPStatus.UNAUTHORIZED){
      toast.error('Неверное имя пользователя')
      return
    }
  }

  toast.error((error as Error).message)
}
