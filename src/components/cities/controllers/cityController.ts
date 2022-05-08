import { Controller, Example, Get, Path, Query, Route } from 'tsoa';
import { Service } from 'typedi';
import { WeatherGetByCityIdDTO } from '../../weather/models/dtos/WeatherGetByCityIdDTO';
import { WeatherService } from '../../weather/services/weatherService';
import { CityGetByIdDTO, CityGetByLocationDTO } from '../models';
import { CityService } from '../services/cityService';

@Service()
@Route('cities')
export class CityController extends Controller {
  constructor(public cityService: CityService, public weatherService: WeatherService) {
    super();
  }

  /**
   *
   * Retrieves the information of a city by id
   * @example id 2938913
   */
  @Get('/:id')
  @Example<CityGetByIdDTO>({
    id: 2938913,
    name: 'Darmstadt',
    lng: 8.64944,
    lat: 49.87056,
  })
  public getCityById(@Path() id: number): Promise<CityGetByIdDTO> {
    return this.cityService.getCityById(id);
  }

  /**
   *  List the available cities around the specified latitude/longitude within a radius of 10 kilometers.
   *  lat and lng params are required.
   * @param lat latitude. Required
   * @param lng longitude. Required
   * @example lat 49.48
   * @example lng 8.46
   */
  @Get('/')
  @Example<CityGetByLocationDTO>({
    id: 2938913,
    name: 'Darmstadt',
  })
  public getCitiesBasedOnLocation(
    @Query() lat?: string,
    @Query() lng?: string,
  ): Promise<CityGetByLocationDTO[]> {
    return this.cityService.getCitiesBasedOnLocation(lat, lng);
  }

  /**
   * Retrieve the weather data for a city by city id
   * @example id 2938913
   */
  @Get('/:id/weather')
  @Example<WeatherGetByCityIdDTO>({
    type: 'Clouds',
    type_description: 'few clouds',
    sunrise: '2022-05-08T03:50:38.000Z',
    sunset: '2022-05-08T18:53:09.000Z',
    temp: 19.77,
    temp_min: 16.62,
    temp_max: 22.42,
    pressure: 1024,
    humidity: 65,
    clouds_percent: 20,
    wind_speed: 7.2,
  })
  public getWeatherByCityId(@Path() id: number): Promise<WeatherGetByCityIdDTO> {
    return this.weatherService.getWeatherByCityId(id);
  }
}
