import { Controller, Get, Path, Route } from 'tsoa';
import { City } from '../models/City';
import { CitiesService } from '../services/citiesService';

@Route('cities')
export class CitiesController extends Controller {
  @Get('/:id')
  public getCity(@Path() id: number): City {
    return new CitiesService().get(id);
  }
}
