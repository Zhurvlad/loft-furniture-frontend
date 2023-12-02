import axios from 'axios';
import {PaymentApi} from './payment';
import {CartApi} from './cart';
import {SofasApi} from './sofas';


export type ApiReturnType = {
  payment: ReturnType<typeof PaymentApi>,
  cart: ReturnType<typeof CartApi>,
  sofas : ReturnType<typeof SofasApi>

}


export const Api = (): ApiReturnType => {

  const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`

  })

  return {
    payment: PaymentApi(instance),
    cart: CartApi(instance),
    sofas: SofasApi(instance)
  }
}
