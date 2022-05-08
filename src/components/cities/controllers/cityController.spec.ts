import Container from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { WeatherService } from '../../weather/services/weatherService';
import { CityService } from '../services/cityService';
import { CityController } from './cityController';

describe('City controller', () => {
  let cityController: CityController;
  const cityService = Container.get(CityService);
  const weatherService = Container.get(WeatherService);

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
      cityService.getCityById = jest.fn().mockResolvedValue(mockCity);
      cityController = new CityController(cityService, weatherService);

      // Act
      const city = await cityController.getCityById(1);

      // Assert
      expect(city).toEqual(mockCity);
      expect(cityService.getCityById).toHaveBeenCalled();
    });

    it('should throw not found error', () => {
      // Arrange
      const appError = new AppError(404, StatusCodes.NOT_FOUND, 'not found');
      cityService.getCityById = jest.fn().mockRejectedValue(appError);
      cityController = new CityController(cityService, weatherService);

      // Assert
      expect(cityController.getCityById(Math.random())).rejects.toThrow(appError);
      expect(cityService.getCityById).toHaveBeenCalled();
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
      cityController = new CityController(cityService, weatherService);

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
      cityController = new CityController(cityService, weatherService);

      // Assert
      expect(cityController.getCitiesBasedOnLocation(Math.random().toString())).rejects.toThrow(
        appError,
      );
      expect(cityService.getCitiesBasedOnLocation).toHaveBeenCalled();
    });
  });

  describe('Get weather by city id', () => {
    it('should return weather object', async () => {
      // Arrange
      const mockWeather = {
        type: 'Clouds',
        type_description: 'few clouds',
        sunrise: '2022-05-08T03:50:38.000Z',
        sunset: '2022-05-08T18:53:10.000Z',
        temp: 21.59,
        temp_min: 19.93,
        temp_max: 23.14,
        pressure: 1024,
        humidity: 65,
        clouds_percent: 20,
        wind_speed: 4.63,
      };
      weatherService.getWeatherByCityId = jest.fn().mockResolvedValue(mockWeather);
      cityController = new CityController(cityService, weatherService);

      // Act
      const weather = await cityController.getWeatherByCityId(1);

      // Assert
      expect(weather).toMatchObject(mockWeather);
      expect(weatherService.getWeatherByCityId).toHaveBeenCalled();
    });

    it('should throw not found error', () => {
      // Arrange
      const appError = new AppError(404, StatusCodes.NOT_FOUND, 'not found');
      weatherService.getWeatherByCityId = jest.fn().mockRejectedValue(appError);
      cityController = new CityController(cityService, weatherService);

      // Act
      expect(cityController.getWeatherByCityId(-1)).rejects.toMatchObject(appError);

      // Assert
      expect(weatherService.getWeatherByCityId).toHaveBeenCalled();
    });
  });
});
