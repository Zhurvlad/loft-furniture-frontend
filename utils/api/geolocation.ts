import {AxiosInstance} from 'axios';
import {GeolocationResponse, IGeolocation} from './types';





export const GeolocationApi = (instance: AxiosInstance) => (
  {
    async getLocation({latitude, longitude} : IGeolocation): Promise<GeolocationResponse> {
      const {data} = await instance.get<IGeolocation, {data: GeolocationResponse}>(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&lang=ru&apiKey=${process.env.NEXT_PUBLIC_GEOAPI_KEY}`,
        {withCredentials: false})

      return data
    },

  }
)
