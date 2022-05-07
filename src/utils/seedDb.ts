import { readFile } from 'node:fs/promises';
import { City, CityModel } from '../components/cities/models/City';

export async function seedDb() {
  const data = await readFile('city.list.json');
  const cities: City[] = JSON.parse(data.toString());
  const cityRecords = cities.map((city) => {
    const cityRecord = new CityModel(city);
    return cityRecord.save();
  });
  await Promise.all(cityRecords);
}
