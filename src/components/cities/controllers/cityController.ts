import { Controller, Get, Path, Route } from 'tsoa';
import { City } from '../models/City';
import { CityService } from '../services/cityService';

@Route('cities')
export class CityController extends Controller {
  @Get('/:id')
  public getCity(@Path() id: number): Promise<City> {
    return new CityService().getById(id);
  }
}
