import Container from 'typedi';
import { AppError, StatusCodes } from '../../core';
import { WeatherService } from './weatherService';

describe('Weather service', () => {
  const weatherService = Container.get(WeatherService);
  const mockCity = {
    id: 2938913,
    name: 'Darmstadt',
    lng: 8.64944,
    lat: 49.87056,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Get weather by city id', () => {
    it('should return weather of the queried city', async () => {
      // Arrange
      weatherService.cityService.getCityById = jest.fn().mockResolvedValue(mockCity);
      const spy = jest.spyOn(weatherService['axiosInstance'], 'get');
      process.env.OPEN_WEATHER_API_KEY = '';
      // Act
      const weather = await weatherService.getWeatherByCityId(mockCity.id);

      // Assert
      expect(weather).toMatchInlineSnapshot(`
        Object {
          "clouds_percent": 20,
          "humidity": 67,
          "pressure": 1024,
          "sunrise": "2022-05-08T03:50:39.000Z",
          "sunset": "2022-05-08T18:53:11.000Z",
          "temp": 22,
          "temp_max": 23.75,
          "temp_min": 20.36,
          "type": "Clouds",
          "type_description": "few clouds",
          "wind_speed": 5.66,
        }
      `);
      expect(spy).toHaveBeenCalledWith('/weather', {
        params: {
          lat: mockCity.lat,
          lon: mockCity.lng,
          units: 'metric',
          appid: expect.any(String),
        },
      });
    });

    it('should throw not found error', () => {
      // Arrange
      const appError = new AppError(404, StatusCodes.NOT_FOUND, 'not found');
      weatherService.cityService.getCityById = jest.fn().mockRejectedValue(appError);
      const spy = jest.spyOn(weatherService['axiosInstance'], 'get');
      // Assert
      expect(weatherService.getWeatherByCityId(-1)).rejects.toMatchObject(appError);
      expect(spy).not.toHaveBeenCalled();
    });
  });
});
