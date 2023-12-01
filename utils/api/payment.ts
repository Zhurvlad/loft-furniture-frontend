import {createAsyncThunk} from '@reduxjs/toolkit';
import {AxiosInstance} from 'axios';

import {IMakePayment, ResponseMakePayment} from './types';


/*export const makePayment = createAsyncThunk*/

export const PaymentApi = (instance: AxiosInstance) => (
  {
    async makePayment({amount, description} : IMakePayment): Promise<ResponseMakePayment> {
      const {data} = await instance.post<IMakePayment, {data:ResponseMakePayment}>('/payment',{amount, description})

      return data
    }
  }
)
