import { AppError } from './AppError';

export class ValidationError extends AppError {
  constructor(message: string, public details?: unknown) {
    super(message, 400);
  } 
}
