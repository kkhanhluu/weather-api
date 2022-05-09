import dotenv from 'dotenv';
import 'reflect-metadata';
import { app } from './app';
import { initMongoose } from './utils/initMongoose';
import { logger } from './utils/logger';

dotenv.config();

(async () => {
  await initMongoose();

  const port = process.env.PORT || 4000;
  const server = app.listen(port, () => {
    logger.info(`App running on port ${port}...`);
  });

  process.on('unhandledRejection', (err) => {
    logger.error(err);
    logger.warn('UNHANDLED REJECTION! 💥. Shutting down...');
    server.close(() => {
      process.exit(1);
    });
  });

  process.on('SIGTERM', () => {
    logger.info('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
      logger.info('💥Process terminated');
    });
  });
})();
