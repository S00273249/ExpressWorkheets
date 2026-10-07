import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import {authenticateKey} from './middleware/auth.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './config/swagger';


const app: Application = express();

app.use(
'/api-docs',
swaggerUi.serve,
swaggerUi.setup(swaggerSpec)
);

app.use(express.json());
app.use('/api/v1/cars', loggingMiddleware, authenticateKey, carRoutes);


app.get("/ping", async (_req : Request, res: Response) => {
    res.json({
    message: "hello from Dan" 
    });
});

app.get('/bananas', async (_req : Request, res: Response) => {
    res.json({
    message: "this is bananas",
    });
});

export { app };

