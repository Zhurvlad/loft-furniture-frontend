import axios from 'axios';
import {PaymentApi} from './payment';
import {CartApi} from './cart';
import {SofasApi} from './sofas';
import {GeolocationApi} from './geolocation';
import {UserApi} from './user';


export type ApiReturnType = {
  payment: ReturnType<typeof PaymentApi>,
  cart: ReturnType<typeof CartApi>,
  sofas : ReturnType<typeof SofasApi>
  location: ReturnType<typeof GeolocationApi>,
  user: ReturnType<typeof UserApi>
}


export const Api = (): ApiReturnType => {

  const instance = axios.create({
    string: undefined,
    withCredentials: true,
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}`
  })

  return {
    payment: PaymentApi(instance),
    cart: CartApi(instance),
    sofas: SofasApi(instance),
    location: GeolocationApi(instance),
    user: UserApi(instance)
  }
}
