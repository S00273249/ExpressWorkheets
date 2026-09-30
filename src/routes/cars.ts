import { Router } from 'express';
import { CarController } from '../controllers/cars';

const carRoutes = Router();
const carController = new CarController();

carRoutes.get('/', carController.getCars);
carRoutes.get('/:id', carController.getCarById);
carRoutes.post('/', carController.createCar);
carRoutes.put('/:id', carController.updateCar);
carRoutes.delete('/:id', carController.deleteCar);

export default carRoutes;
