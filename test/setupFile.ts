import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import 'reflect-metadata';

beforeAll(async () => {
  const instance: MongoMemoryServer = (global as any).MONGO_INSTANCE;
  await mongoose.connect(instance.getUri());
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});
