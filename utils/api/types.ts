import {ISofas} from '../../models/ISofas';
import {ICart} from '../../types/cart';

export type ErrorWithMessage = {
    status: number,
    data: {
        message: string
    }
}

export type ResponseMakePayment = {
  id: string,
  status: string,
  amount: {
    value: string,
    currency: string
  },
  recipient: {
    account_id: string,
    gateway_id: string
  },
  created_at: string,
  confirmation: {
    type: string,
    confirmation_url: string
  },
  test: boolean,
  paid: boolean,
  refundable: boolean,
  metadata: object
}

export interface IMakePayment {
  description: string
  amount: number
}

export interface ICheckPayment {
  paymentId: string
}

export interface GetSofasDto extends ISofas {}

export interface FiltersSofaDto extends ISofas {}

export interface ResponseAddToCart extends ICart{

}



