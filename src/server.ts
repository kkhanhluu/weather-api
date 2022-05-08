import Debug from 'debug';
import dotenv from 'dotenv';
import 'reflect-metadata';
import { app } from './app';
import { initMongoose } from './utils/initMongoose';

dotenv.config();

const debug = Debug('Weather API');

(async () => {
  await initMongoose();

  const port = process.env.PORT || 4000;
  const server = app.listen(port, () => {
    debug(`App running on port ${port}...`);
  });

  process.on('unhandledRejection', (err) => {
    debug(err);
    debug('UNHANDLED REJECTION! 💥. Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    debug('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      debug('💥Process terminated');
    });
  });
})();
