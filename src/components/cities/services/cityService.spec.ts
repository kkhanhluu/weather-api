import Container from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { CityModel } from '../models/City';
import { CityService } from './cityService';

describe('City service', () => {
  const cityService = Container.get(CityService);
  const mockCities = [
    {
      id: 2938913,
      name: 'Darmstadt',
      state: '',
      country: 'DE',
      location: {
        type: 'Point',
        coordinates: [8.64944, 49.87056],
      },
    },
    {
      id: 2873891,
      name: 'Mannheim',
      state: '',
      country: 'DE',
      location: {
        type: 'Point',
        coordinates: [8.46472, 49.488331],
      },
    },
    {
      id: 2853924,
      name: 'Pfungstadt',
      state: '',
      country: 'DE',
      location: {
        type: 'Point',
        coordinates: [8.60694, 49.806389],
      },
    },
  ];

  describe('Get city by id', () => {
    it('should return city with correct id', async () => {
      // Arrange
      await CityModel.insertMany(mockCities);
      const spy = jest.spyOn(CityModel, 'findOne');
      // Act
      const city = await cityService.getCityById(mockCities[0].id);

      // Assert
      expect(city).toEqual({
        id: 2938913,
        name: 'Darmstadt',
        lng: 8.64944,
        lat: 49.87056,
      });
      expect(spy).toHaveBeenCalledWith({ id: mockCities[0].id }, { _id: 0 });
    });

    it('should throw not found error', () => {
      // Arrange
      const spy = jest.spyOn(CityModel, 'findOne');
      // Assert
      expect(cityService.getCityById(-1)).rejects.toMatchObject(
        new AppError(404, StatusCodes.NOT_FOUND, 'not found'),
      );
      expect(spy).toHaveBeenCalledWith({ id: -1 }, { _id: 0 });
    });
  });

  describe('Get cites by location', () => {
    it('should return cities within 10 radius of longitude and latitude', async () => {
      // Arrange
      await CityModel.insertMany(mockCities);
      const spy = jest.spyOn(CityModel, 'find');
      const latitude = mockCities[0].location.coordinates[1].toString();
      const longitude = mockCities[0].location.coordinates[0].toString();
      // Act
      const city = await cityService.getCitiesBasedOnLocation(latitude, longitude);

      // Assert
      expect(city).toEqual([
        {
          id: 2938913,
          name: 'Darmstadt',
        },
        {
          id: 2853924,
          name: 'Pfungstadt',
        },
      ]);
      expect(spy).toHaveBeenCalledWith({
        location: {
          $geoWithin: { $centerSphere: [[Number(longitude), Number(latitude)], 10 / 6378.1] },
        },
      });
    });

    it('should throw bad request error if lat or lon is missing', () => {
      // Arrange
      const spy = jest.spyOn(CityModel, 'find');
      // Assert
      expect(cityService.getCitiesBasedOnLocation('8.49')).rejects.toMatchObject(
        new AppError(400, StatusCodes.BAD_REQUEST, 'lat/lng required'),
      );
      expect(spy).not.toHaveBeenCalled();
    });

    it('should throw bad request error if lat or lon is invalid', () => {
      // Arrange
      const spy = jest.spyOn(CityModel, 'find');
      // Assert
      expect(cityService.getCitiesBasedOnLocation('fdfasd', 'dfadfas')).rejects.toMatchObject(
        new AppError(400, StatusCodes.BAD_REQUEST, 'lat/lng required'),
      );
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
