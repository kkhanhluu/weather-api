import dotenv from 'dotenv';
import express, { Request, Response } from 'express';
import helmet from 'helmet';
import { default as logger, default as morgan } from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from '../public/routes';
import { globalErrorHandler } from './utils/globalErrorHandler';
import { notFoundHandler } from './utils/notFoundHandler';

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

app.use('/docs', swaggerUi.serve, async (_req: Request, res: Response) =>
  res.send(swaggerUi.generateHTML(await import('../public/swagger.json'))),
);

RegisterRoutes(app);

app.use(notFoundHandler);
app.use(globalErrorHandler);
