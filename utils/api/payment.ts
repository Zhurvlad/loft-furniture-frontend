import {AxiosInstance} from 'axios';

import {ICheckPayment, IMakePayment, ResponseMakePayment} from './types';


/*export const makePayment = createAsyncThunk*/

export const PaymentApi = (instance: AxiosInstance) => (
  {
    async makePayment({amount, description} : IMakePayment): Promise<ResponseMakePayment> {
      const {data} = await instance.post<IMakePayment, {data:ResponseMakePayment}>('/payment',{amount, description})

      return data
    },

    //@ts-ignore
    async checkPayment(paymentId: string) : ICheckPayment{
      const {data} = await instance.post<string>('/payment/info', {paymentId})

      //@ts-ignore
      return data
    },
  }
)
