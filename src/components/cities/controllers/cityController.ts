import { Controller, Get, Path, Query, Route } from 'tsoa';
import { Service } from 'typedi';
import { CityGetByIdDTO, CityGetByLocationDTO } from '../models';
import { CityService } from '../services/cityService';

@Service()
@Route('cities')
export class CityController extends Controller {
  constructor(public cityService: CityService) {
    super();
  }

  @Get('/:id')
  public getCityById(@Path() id: number): Promise<CityGetByIdDTO> {
    return this.cityService.getById(id);
  }

  @Get('/')
  public getCitiesBasedOnLocation(
    @Query() latitude?: string,
    @Query() longitude?: string,
  ): Promise<CityGetByLocationDTO[]> {
    return this.cityService.getCitiesBasedOnLocation(latitude, longitude);
  }
}
