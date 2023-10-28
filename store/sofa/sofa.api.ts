import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
import {ISofas} from '../../models/ISofas';



export const sofaApi = createApi({
  reducerPath: 'api/sofas',
  baseQuery: fetchBaseQuery({baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`}),
  endpoints: build => ({
    getSofas: build.query<ISofas[], number, number>({
      query: (limit: number = 10, offset:number =0) =>({
        url: 'sofas/bestsellers',
        params: {limit: limit, offset: offset}
      })})
  })
})


export const {useGetSofasQuery } = sofaApi
