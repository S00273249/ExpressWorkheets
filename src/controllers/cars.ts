import { createCarZSchema, updateCarZSchema } from '../models/cars';
import { Request, Response } from 'express';
import { CarService } from '../services/cars';

const carService = new CarService();

export class CarController {

    // Get all cars
    getCars = async (_req: Request, res: Response): Promise<void> => {
      try {

        const cars = await carService.getAllCars();
        res.status(200).json(cars);

      } catch (error) {

        res.status(500).json({
            message: 'Error fetching cars',
            error
        });
      }
    };

    // Get a car by its ID
    getCarById = async (req: Request, res: Response): Promise<void> => {
      try {

        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const car = await carService.getCarById(id);

        if (!car) {
          res.status(404).json({
            message: 'Car not found'
          });
          return;
        }

        res.status(200).json(car);

      } catch (error) {

        res.status(500).json({
            message: 'Error fetching car',
            error
        });
      }
    };

    // Create a new car
    createCar = async (req: Request, res: Response): Promise<void> => {
      try {

        const validation = createCarZSchema.safeParse(req.body);

        if (!validation.success) {
          res.status(400).json({
              message: 'Invalid car data',
              errors: validation.error.issues
          });
          return;
        }

        const newCar = await carService.createCar(req.body);
        res.status(201).json(newCar);

      } catch (error) {

        res.status(500).json({
            message: 'Error inserting into MongoDB',
            error
        });
      }
    };

    // Update an existing car
    updateCar = async (req: Request, res: Response): Promise<void> => {
      try {

        const validation = updateCarZSchema.safeParse(req.body);

        if (!validation.success) {
          res.status(400).json({
              message: 'Invalid car data',
              errors: validation.error.issues
          });
          return;
        }

        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const updatedCar = await carService.updateCar(id, req.body);

        if (!updatedCar) {
          res.status(404).json({
              message: 'Car not found'
          });
          return;
        }

        res.status(200).json(updatedCar);

      } catch (error) {

        res.status(500).json({
            message: 'Error updating car',
            error
        });
      }
    };

    // Delete a car by its ID
    deleteCar = async (req: Request, res: Response): Promise<void> => {
      try {

        const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
        const car = await carService.deleteCar(id);

        if (!car) {
          res.status(404).json({
              message: 'Car not found'
          });
          return;
        }

        res.status(200).json(car);

      } catch (error) {

        res.status(500).json({
            message: 'Error deleting car',
            error
        });
      }
    };

}