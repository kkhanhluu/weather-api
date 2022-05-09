import request from 'supertest';
import Container from 'typedi';
import { app } from '../../../app';
import { CityModel } from '../../cities/models';
import { StatusCodes } from '../../core';
import { WeatherService } from '../services/weatherService';

describe('City e2e test', () => {
  const weatherService = Container.get(WeatherService);

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
  ];

  describe('/GET/:id/weather', () => {
    it('should return status 200', async () => {
      // Arrange
      await CityModel.insertMany(mockCities);
      // Act
      const res = await request(app).get('/cities/2938913/weather').expect('Content-Type', /json/);
      // Assert
      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(await weatherService.getWeatherByCityId(2938913));
    });

    it('should return status 404', async () => {
      // Act
      const res = await request(app).get('/cities/1/weather').expect('Content-Type', /json/);
      // Assert
      expect(res.statusCode).toEqual(404);
      expect(res.body).toEqual({ code: StatusCodes.NOT_FOUND, message: 'not found' });
    });
  });
});
