import express from 'express';
import { CitiesController } from '../controllers/citiesController';

export const router = express.Router();

router.get('/:id', (req, res) => {
  const controller = new CitiesController();
  const city = controller.getCity(Number(req.params.id));
  return res.json(city);
});
