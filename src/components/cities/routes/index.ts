import express from 'express';
import Container from 'typedi';
import { CityController } from '../controllers/cityController';

export const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const controller = Container.get(CityController);
    const cities = await controller.getCitiesBasedOnLocation(
      req.query.lat as string,
      req.query.lng as string,
    );
    return res.status(200).json(cities);
  } catch (err: any) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const controller = Container.get(CityController);
    const city = await controller.getCityById(Number(req.params.id));
    return res.status(200).json(city);
  } catch (err: any) {
    next(err);
  }
});

router.get('/:id/weather', async (req, res, next) => {
  try {
    const controller = Container.get(CityController);
    const weather = await controller.getWeatherByCityId(Number(req.params.id));
    return res.status(200).json(weather);
  } catch (err: any) {
    next(err);
  }
});
