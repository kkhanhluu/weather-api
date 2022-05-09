import { seedDb } from '.';
import { CityModel } from '../../components/cities/models';
import mockCities from './city.list.test.json';

describe('Seed DB script', () => {
  it('should create records in database', async () => {
    // Act
    await seedDb('./city.list.test.json');
    const cities = await CityModel.find();
    // Assert
    expect(cities.length).toBe(mockCities.length);
    expect(cities[0].name).toBe(mockCities[0].name);
    expect(cities[1].name).toBe(mockCities[1].name);
  });
});
