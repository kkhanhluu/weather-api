import { seedDb } from '.';
import mockCities from '../../../test/city.list.test.json';
import { CityModel } from '../../components/cities/models';

describe('Seed DB script', () => {
  it('should create records in database', async () => {
    // Act
    await seedDb('./test/city.list.test.json');
    const cities = await CityModel.find();
    // Assert
    expect(cities.length).toBe(mockCities.length);
    expect(cities[0].name).toBe(mockCities[0].name);
    expect(cities[1].name).toBe(mockCities[1].name);
  });
});
