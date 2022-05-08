import Container from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { CityService } from '../services/cityService';
import { CityController } from './cityController';

describe('City controller', () => {
  let cityController: CityController;
  const cityService = Container.get(CityService);

  describe('Get city by id', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return a city', async () => {
      // Arrange
      const mockCity = {
        id: 1,
        name: 'Darmstadt',
        lat: 49.87,
        lon: 8.694,
      };
      cityService.getById = jest.fn().mockResolvedValue(mockCity);
      cityController = new CityController(cityService);

      // Act
      const city = await cityController.getCityById(1);

      // Assert
      expect(city).toEqual(mockCity);
      expect(cityService.getById).toHaveBeenCalled();
    });

    it('should throw not found error', () => {
      // Arrange
      const appError = new AppError(404, StatusCodes.NOT_FOUND, 'not found');
      cityService.getById = jest.fn().mockRejectedValue(appError);
      cityController = new CityController(cityService);

      // Assert
      expect(cityController.getCityById(Math.random())).rejects.toThrow(appError);
      expect(cityService.getById).toHaveBeenCalled();
    });
  });

  describe('Get city by longitude and latitude', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return cities', async () => {
      // Arrange
      const mockCities = [
        {
          id: 1,
          name: 'Darmstadt',
        },
        {
          id: 2,
          name: 'Pfungstadt',
        },
      ];
      cityService.getCitiesBasedOnLocation = jest.fn().mockResolvedValue(mockCities);
      cityController = new CityController(cityService);

      // Act
      const city = await cityController.getCitiesBasedOnLocation(
        Math.random().toString(),
        Math.random().toString(),
      );

      // Assert
      expect(city).toEqual(mockCities);
      expect(cityService.getCitiesBasedOnLocation).toHaveBeenCalled();
    });

    it('should throw bad request error', () => {
      // Arrange
      const appError = new AppError(400, StatusCodes.BAD_REQUEST, 'lat/lng required');
      cityService.getCitiesBasedOnLocation = jest.fn().mockRejectedValue(appError);
      cityController = new CityController(cityService);

      // Assert
      expect(cityController.getCitiesBasedOnLocation(Math.random().toString())).rejects.toThrow(
        appError,
      );
      expect(cityService.getCitiesBasedOnLocation).toHaveBeenCalled();
    });
  });
});
