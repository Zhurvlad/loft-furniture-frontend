import {AxiosInstance} from 'axios';
import {FiltersSofaDto, GetSofasDto, PromiseGetOneSofa, PromiseSearchSofa, ResponseSearchSofa} from './types';

export const SofasApi = (instance: AxiosInstance) => (
  {
    async getSofas() {
      const {data} = await instance.get<GetSofasDto[]>('/sofas?limit=20&offset=1')
      return data
    },

    async filtersSofa (path: string) : Promise<FiltersSofaDto> {

      const {data} = await instance.get<string, {data: FiltersSofaDto}>(`/sofas?limit=15&offset=${path}`)

      return data
    },

    async searchSofa (search: string): Promise<PromiseSearchSofa> {
      const {data} = await instance.post<string, {data: ResponseSearchSofa}>('/sofas/search', {search})

      return data
    },

    async searchSofaByName (name: string): Promise<PromiseGetOneSofa> {
      const {data} = await instance.post<string, {data: PromiseGetOneSofa}>('/sofas/name', {name})

      return data
    },

    async getOne(itemId: string) :Promise<PromiseGetOneSofa>{
      const {data} = await instance.get<string, {data: PromiseGetOneSofa}>(`sofas/find/${itemId}`)

      return data
    }
  }
)
