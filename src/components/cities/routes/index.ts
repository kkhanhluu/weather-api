import express from 'express';
import Container from 'typedi';
import { CityController } from '../controllers/cityController';

export const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const controller = Container.get(CityController);
    const city = await controller.getCityById(Number(req.params.id));
    return res.status(200).json(city);
  } catch (err: any) {
    next(err);
  }
});
