import dotenv from 'dotenv';
import 'reflect-metadata';
import { app } from './app';
import { initMongoose } from './utils/initMongoose';

dotenv.config();

(async () => {
  await initMongoose();

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
})();
