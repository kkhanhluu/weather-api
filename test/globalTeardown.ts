import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

async function globalTeardown() {
  const instance: MongoMemoryServer = (global as any).MONGO_INSTANCE;

  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await instance.stop();
}

export default globalTeardown;
