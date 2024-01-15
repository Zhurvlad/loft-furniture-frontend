import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/dist/query/react';
import React from 'react';


const baseQuery = fetchBaseQuery({
  /*//@ts-ignore*/
  withCredentials: true,
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`,
  credentials: 'include',
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3})

export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})
