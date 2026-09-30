import { createCarZSchema, updateCarZSchema } from './../models/cars';
import { validate } from '../middleware/validate.middleware';
import { Router } from 'express';
import { CarController } from '../controllers/cars';

const carRoutes = Router();
const carController = new CarController();

carRoutes.get('/', carController.getCars);
carRoutes.get('/:id', carController.getCarById);
carRoutes.post('/', validate(createCarZSchema), carController.createCar);
carRoutes.put('/:id', validate(updateCarZSchema), carController.updateCar);
carRoutes.delete('/:id', carController.deleteCar);

export default carRoutes;
