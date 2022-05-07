import dotenv from 'dotenv';
import { connect } from 'mongoose';
import { app } from './app';
import { CityModel } from './components/cities/models/City';
import { seedDb } from './utils/seedDb';

dotenv.config();

connect(process.env.MONGO_DB_URI as string).then(async () => {
  const cityCount = await CityModel.count();
  if (cityCount === 0) {
    await seedDb();
  }
  console.log('Connect to db successfully');
});
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log('UNHANDLED REJECTION! 💥. Shutting down...');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
  server.close(() => {
    console.log('💥Process terminated');
  });
});
