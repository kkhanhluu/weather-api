import dotenv from 'dotenv';
import express, { NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { default as logger, default as morgan } from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { router as CityRouter } from './components/cities/routes';
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
app.use(express.static('public'));

app.use('/health', healthRouter);

app.use(
  '/docs',
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: '../swagger.json',
    },
  }),
);

app.use('/cities', CityRouter);

app.use((err: any, _: Request, res: Response, __: NextFunction) =>
  res.status(err.statusCode).json({ code: err.codeString, message: err.message }),
);
