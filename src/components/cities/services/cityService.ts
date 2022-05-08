import { Service } from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { CityGetByIdDTO, CityGetByLocationDTO, CityModel } from '../models';

@Service()
export class CityService {
  public async getCityById(id: number): Promise<CityGetByIdDTO> {
    const city = await CityModel.findOne({ id }, { _id: 0 }).lean().exec();
    if (!city) {
      throw new AppError(404, StatusCodes.NOT_FOUND, 'not found');
    }
    return {
      id: city.id,
      name: city.name,
      lng: city.location.coordinates[0],
      lat: city.location.coordinates[1],
    };
  }

  public async getCitiesBasedOnLocation(
    latitude?: string,
    longitude?: string,
  ): Promise<CityGetByLocationDTO[]> {
    if (latitude == null || longitude == null) {
      throw new AppError(400, StatusCodes.BAD_REQUEST, 'lat/lng required');
    }

    const lng = Number(longitude);
    const lat = Number(latitude);
    if (Number.isNaN(lng) || Number.isNaN(lat)) {
      throw new AppError(400, StatusCodes.BAD_REQUEST, 'lat/lng required');
    }

    const cities = await CityModel.find({
      location: { $geoWithin: { $centerSphere: [[lng, lat], 10 / 6378.1] } },
    });
    return cities.map(({ id, name }) => ({ id, name }));
  }
}
