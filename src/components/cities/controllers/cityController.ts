import { Controller, Get, Path, Query, Route } from 'tsoa';
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

  @Get('/:id')
  public getCityById(@Path() id: number): Promise<CityGetByIdDTO> {
    return this.cityService.getCityById(id);
  }

  @Get('/')
  public getCitiesBasedOnLocation(
    @Query() latitude?: string,
    @Query() longitude?: string,
  ): Promise<CityGetByLocationDTO[]> {
    return this.cityService.getCitiesBasedOnLocation(latitude, longitude);
  }

  @Get('/:id/weather')
  public getWeatherByCityId(@Path() id: number): Promise<WeatherGetByCityIdDTO> {
    return this.weatherService.getWeatherByCityId(id);
  }
}
