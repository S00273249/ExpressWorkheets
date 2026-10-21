import { createCarZSchema, updateCarZSchema } from './../models/cars';
import { validate } from '../middleware/validate.middleware';
import { Router } from 'express';
import { CarController } from '../controllers/cars';
import { carParamsSchema } from '../models/cars';

const carRoutes = Router();
const carController = new CarController();

carRoutes.get('/', carController.getCars);
carRoutes.get('/:id', validate(carParamsSchema), carController.getCarById);
carRoutes.post('/', validate(createCarZSchema), carController.createCar);
carRoutes.put('/:id', validate(carParamsSchema), validate(updateCarZSchema), carController.updateCar);
carRoutes.delete('/:id', validate(carParamsSchema), carController.deleteCar);

export default carRoutes;
