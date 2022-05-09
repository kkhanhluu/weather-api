import { connect } from 'mongoose';
import { CityModel } from '../components/cities/models/City';
import { seedDb } from './seedDb';

export async function initMongoose() {
  await connect(process.env.MONGO_DB_URI as string);
  const cityCount = await CityModel.count();
  if (cityCount === 0) {
    await seedDb('./city.list.json');
  }
}
