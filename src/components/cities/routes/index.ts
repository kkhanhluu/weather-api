import express from 'express';
import { CityController } from '../controllers/cityController';

export const router = express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const controller = new CityController();
    const city = await controller.getCity(Number(req.params.id));
    return res.status(200).json(city);
  } catch (err: any) {
    next(err);
  }
});
