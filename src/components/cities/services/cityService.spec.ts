import Container from 'typedi';
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

  describe('Get city by id', () => {
    it('should return city with correct id', async () => {
      // Arrange
      const spy = jest.spyOn(CityModel, 'findOne');
      // Act
      const city = await cityService.getById(mockCities[0].id);

      // Assert
      expect(city).toEqual(mockCities[0]);
      expect(spy).toHaveBeenCalledWith({ id: mockCities[0].id }, { _id: 0 });
      expect(1).toBe(1);
    });
  });
});
