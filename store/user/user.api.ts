import {api} from '../api';
import {IRegister, LoginUser, LoginUserResponse, ResponseCreateUser, ResponseLoginUser} from '../../types/auth';


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.query<ResponseCreateUser, IRegister>({
      query: (userDto) =>({
        url: 'auth/signup',
        method: 'POST',
        body: userDto,
      })
    }),
    login: builder.mutation<ResponseLoginUser, LoginUser>({
      query: (userDto) => ({
        url: 'auth/login',
        method: 'POST',
        body: userDto,
      })
    }),
    loginCheck: builder.query<LoginUserResponse, void>({
      query: () => ({
        url: 'users/login-check',
        method: 'GET',

      })
    }),
    /*logout: builder.query({
      query: () => ({
        url: 'auth/logout',
        method: 'GET',
      })
    }),*/
  })
})

//@ts-ignore
export const {useLoginMutation, useLoginCheckQuery, useRegisterMutation, useLogoutQuery} = authApi

//@ts-ignore
export const {endpoints: {register, login, loginCheck, logout}} = authApi
