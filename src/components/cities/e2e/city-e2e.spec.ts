import request from 'supertest';
import Container from 'typedi';
import { app } from '../../../app';
import { StatusCodes } from '../../core';
import { CityModel } from '../models/City';
import { CityService } from '../services/cityService';

describe('City e2e test', () => {
  const cityService = Container.get(CityService);

  const mockCities = [
    {
      id: 2938913,
      name: 'Darmstadt',
      state: '',
      country: 'DE',
      coord: {
        lon: 8.64944,
        lat: 49.87056,
      },
    },
    {
      id: 2873891,
      name: 'Mannheim',
      state: '',
      country: 'DE',
      coord: {
        lon: 8.46472,
        lat: 49.488331,
      },
    },
  ];

  beforeAll(async () => {
    await CityModel.insertMany(mockCities);
  });

  afterAll(async () => {
    await CityModel.deleteMany();
  });

  it('/GET/:id should return status 200', async () => {
    // Act
    const res = await request(app).get('/cities/2938913').expect('Content-Type', /json/);
    // Assert
    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(await cityService.getById(2938913));
  });

  it('/GET/:id should return status 404', async () => {
    // Act
    const res = await request(app).get('/cities/1').expect('Content-Type', /json/);
    // Assert
    expect(res.statusCode).toEqual(404);
    expect(res.body).toEqual({ code: StatusCodes.NOT_FOUND, message: 'not found' });
  });
});
