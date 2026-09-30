import express, {Application, Request, Response} from "express" ;
import carRoutes from './routes/cars';
import { env } from "./config/.env";
import { connectDB } from "./config/database/database";
import {authenticateKey} from './middleware/auth.middleware';
import { loggingMiddleware } from './middleware/logging.middleware';

const PORT = env.port || 4545;
const app: Application = express();

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

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

};

startServer();

