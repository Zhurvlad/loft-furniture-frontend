import {AxiosError, AxiosInstance} from 'axios';
import {CreateUserDto, LoginUserResponse, ResponseCreateUser} from '../../types/auth';
import {HTTPStatus} from '../../constans/index';
import {toast} from 'react-toastify';



export const UserApi = (instance : AxiosInstance) => (
  {
    async register(dto:CreateUserDto): Promise<ResponseCreateUser> {
      const {data} = await instance.post<CreateUserDto, {data: ResponseCreateUser}>('/auth/signup', dto)

      return data
    },
    async checkUser (): Promise<LoginUserResponse>{
     try {
       const {data} = await instance.get<void, {data: LoginUserResponse}>('users/login-check')

       return data
     } catch (e) {
       const axiosError = e as AxiosError

       if(axiosError.response){
         if(axiosError.response.status === HTTPStatus.FORBIDDEN){
           return
         }
       }
       toast.error((e as Error).message)
     }
    }
  }
)
