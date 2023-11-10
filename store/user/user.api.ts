import {api} from '../api';
import {ISofas} from '../../models/ISofas';
import {IRegister, LoginUser, LoginUserResponse, ResponseCreateUser, ResponseLoginUser} from '../../types/auth';
import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/dist/query/react';


/*const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3})

export const apiAuth = createApi({
  reducerPath: 'auth',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})*/


export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<ResponseCreateUser, IRegister>({
      query: (userDto) =>({
        url: 'auth/signup',
        method: 'POST',
        body: userDto
      })
    }),
    login: builder.mutation<ResponseLoginUser, LoginUser>({
      query: (userDto) => ({
        url: 'auth/login',
        method: 'POST',
        body: userDto
      })
    }),
    loginCheck: builder.query<LoginUserResponse, void>({
      query: () => ({
        url: 'auth/login-check',
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


export const {useLoginMutation, useLoginCheckQuery, useRegisterMutation, useLogoutQuery} = authApi

export const {endpoints: {register, login, loginCheck, logout}} = authApi
