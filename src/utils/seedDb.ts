import { readFile } from 'node:fs/promises';
import { CityModel } from '../components/cities/models/City';

interface CityFromFile {
  id: number;
  name: string;
  state?: string;
  country?: string;
  coord: {
    lat: number;
    lon: number;
  };
}
export async function seedDb() {
  const data = await readFile('city.list.json');
  const cities: CityFromFile[] = JSON.parse(data.toString());
  const cityRecords = cities.map(({ coord: { lat, lon }, ...rest }) => {
    const cityRecord = new CityModel({
      ...rest,
      location: {
        type: 'Point',
        coordinates: [lon, lat],
      },
    });
    return cityRecord.save();
  });
  await Promise.all(cityRecords);
}
