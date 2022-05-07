import { Service } from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { City, CityModel } from '../models/City';

@Service()
export class CityService {
  public async getById(id: number): Promise<City> {
    const city = await CityModel.findOne({ id }, { _id: 0 }).lean().exec();
    if (!city) {
      throw new AppError(404, StatusCodes.NOT_FOUND, 'not found');
    }
    return city;
  }
}
