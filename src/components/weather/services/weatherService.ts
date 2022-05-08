import axios, { AxiosInstance } from 'axios';
import { Service } from 'typedi';
import { CityService } from '../../cities/services/cityService';
import { WeatherGetByCityIdDTO } from '../models/dtos/WeatherGetByCityIdDTO';
import { OpenWeather } from '../models/OpenWeather';

@Service()
export class WeatherService {
  private axiosInstance: AxiosInstance;

  constructor(public cityService: CityService) {
    this.axiosInstance = axios.create();
    this.axiosInstance.defaults.baseURL = 'https://api.openweathermap.org/data/2.5';
    this.axiosInstance.defaults.headers.common['Content-type'] = 'application/json;charset=UTF-8';
  }

  public async getWeatherByCityId(cityId: number): Promise<WeatherGetByCityIdDTO> {
    const { lat, lng } = await this.cityService.getCityById(cityId);
    const {
      data: {
        weather,
        main: { temp, temp_max, temp_min, pressure, humidity },
        wind: { speed: winSpeed },
        sys: { sunrise, sunset },
        clouds: { all: cloudPercentage },
      },
    } = await this.axiosInstance.get<OpenWeather>('/weather', {
      params: {
        lat,
        lon: lng,
        units: 'metric',
        appid: process.env.OPEN_WEATHER_API_KEY,
      },
    });

    return {
      type: weather?.[0].main,
      type_description: weather?.[0].description,
      sunrise: new Date(sunrise * 1000).toISOString(),
      sunset: new Date(sunset * 1000).toISOString(),
      temp,
      temp_min,
      temp_max,
      pressure,
      humidity,
      clouds_percent: cloudPercentage,
      wind_speed: winSpeed,
    };
  }
}
