import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import 'reflect-metadata';
import { mswServer } from '../mocks/server';

beforeAll(async () => {
  const instance: MongoMemoryServer = (global as any).MONGO_INSTANCE;
  await mongoose.connect(instance.getUri());
  mswServer.listen();
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  mswServer.close();
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
  mswServer.resetHandlers();
  jest.clearAllMocks();
});
