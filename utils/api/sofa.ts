import {AxiosInstance} from 'axios';
import {FiltersSofaDto, GetSofasDto} from './types';


/*export const makePayment = createAsyncThunk*/

export const SofasApi = (instance: AxiosInstance) => (
  {
    async getSofas() {
      const {data} = await instance.get<GetSofasDto[]>('/sofas?limit=20&offset=1')
      return data
    },

    async filtersSofa (path: string) : Promise<FiltersSofaDto> {

      const {data} = await instance.get<string, {data: FiltersSofaDto}>(`/sofas?limit=15&offset=${path}`)

      return data
    }
  }
)
