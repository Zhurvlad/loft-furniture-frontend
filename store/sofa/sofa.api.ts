import {ISofas} from '../../models/ISofas';
import {api} from '../api';

/*
const baseQuery = fetchBaseQuery({
  baseUrl: `${process.env.NEXT_PUBLIC_SERVER_URL}`
})

const baseQueryWithRetry = retry(baseQuery, {maxRetries: 3})
*/

/*export const sofaApi = createApi({
  reducerPath: 'api/sofas',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: build => ({
    getSofas: build.query<ISofas[], number, number>({
      query: (limit: number = 10, offset:number =0) =>({
        url: 'sofas/bestsellerss',
        params: {limit: limit, offset: offset}
      })})
  })
})*/


/*export const apiSofa = createApi({
  reducerPath: 'sofa',
  baseQuery: baseQueryWithRetry,
  refetchOnMountOrArgChange: true,
  endpoints: () => ({})
})*/

export const sofaApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSofas: builder.query<ISofas[], number, number>({
      query: (limit: number = 10, offset:number =0) =>({
        url: 'sofas/bestsellers',
        params: {limit: limit, offset: offset},
        method: 'GET',
      })})
  })
})


export const {useGetSofasQuery} = sofaApi
