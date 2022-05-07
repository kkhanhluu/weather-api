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
        state: 'Hessen',
        country: 'DE',
        coord: {
          lat: 49.87,
          lon: 8.694,
        },
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
      expect(cityController.getCityById(1)).rejects.toThrow(appError);
      expect(cityService.getById).toHaveBeenCalled();
    });
  });
});
