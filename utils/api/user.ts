import {AxiosInstance} from 'axios';
import {CreateUserDto, ResponseCreateUser} from '../../types/auth';



export const UserApi = (instance : AxiosInstance) => (
  {
    async register(dto:CreateUserDto): Promise<ResponseCreateUser> {
      const {data} = await instance.post<CreateUserDto, {data: ResponseCreateUser}>('/user/signup', dto)

      return data
    }
  }
)
