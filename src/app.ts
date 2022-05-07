import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import { default as logger, default as morgan } from 'morgan';
import healthRouter from './routes/health';

dotenv.config();

export const app = express();

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/health', healthRouter);
