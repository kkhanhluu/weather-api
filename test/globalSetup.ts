import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let instance: MongoMemoryServer;

export default async function connectInMemoryDB() {
  instance = await MongoMemoryServer.create();
  const uri = instance.getUri();
  await mongoose.connect(uri);

  (global as any).MONGO_INSTANCE = instance;

  // To make sure the in-memory database clean before test starts
  // await mongoose.connection.db.dropDatabase();
  // await mongoose.disconnect();
}

// export async function disconnectInMemoryDB() {
//   await mongoose.connection.dropDatabase();
//   await mongoose.connection.close();
//   await instance.stop();
// }
