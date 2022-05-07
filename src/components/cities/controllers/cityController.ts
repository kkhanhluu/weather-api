import { Controller, Get, Path, Route } from 'tsoa';
import { Service } from 'typedi';
import { City } from '../models/City';
import { CityService } from '../services/cityService';

@Service()
@Route('cities')
export class CityController extends Controller {
  constructor(public cityService: CityService) {
    super();
  }

  @Get('/:id')
  public getCityById(@Path() id: number): Promise<City> {
    return this.cityService.getById(id);
  }
}
