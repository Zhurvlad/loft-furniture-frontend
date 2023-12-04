import {ISofa, ISofas} from '../../models/ISofas';
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

export interface ResponseAddToCart extends ICart{}

export interface ResponseSearchSofa extends ISofas{}

export interface PromiseSearchSofa extends ISofa{}

export interface PromiseGetOneSofa extends ISofa{}

export interface IGeolocation {
  latitude: number,
  longitude: number
}












export interface GeolocationResponse {
  type: string
  features: Feature[]
  query: Query
}

export interface Feature {
  type: string
  properties: Properties
  geometry: Geometry
  bbox: number[]
}

export interface Properties {
  datasource: Datasource
  name: string
  country: string
  country_code: string
  region: string
  state: string
  county: string
  city: string
  postcode: string
  street: string
  lon: number
  lat: number
  distance: number
  result_type: string
  formatted: string
  address_line1: string
  address_line2: string
  timezone: Timezone
  plus_code: string
  rank: Rank
  place_id: string
}

export interface Datasource {
  sourcename: string
  attribution: string
  license: string
  url: string
}

export interface Timezone {
  name: string
  offset_STD: string
  offset_STD_seconds: number
  offset_DST: string
  offset_DST_seconds: number
  abbreviation_STD: string
  abbreviation_DST: string
}

export interface Rank {
  importance: number
  popularity: number
}

export interface Geometry {
  type: string
  coordinates: number[]
}

export interface Query {
  lat: number
  lon: number
  plus_code: string
}

