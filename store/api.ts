import {createApi, fetchBaseQuery, retry} from '@reduxjs/toolkit/dist/query/react';


const baseQuery = fetchBaseQuery({
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
