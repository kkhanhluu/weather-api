import { seedDb } from '.';
import { CityModel } from '../../components/cities/models';

describe('Seed DB script', () => {
  it('should create records in database', async () => {
    // Act
    await seedDb();
    const cities = await CityModel.find();
    // Assert
    expect(cities.length).toBe(2);
    expect(cities[0].name).toBe('Ḩeşār-e Sefīd');
    expect(cities[1].name).toBe('‘Ayn Ḩalāqīm');
  });
});
