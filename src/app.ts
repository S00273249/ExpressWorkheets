import express, { Application, Request, Response } from "express";
import carRoutes from "./routes/cars";
import { authenticateKey } from "./middleware/auth.middleware";
import { loggingMiddleware } from "./middleware/logging.middleware";
import { errorHandler } from "./middleware/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger";
import cors from "cors";

const app: Application = express();

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(cors());
app.use(express.json());

// Special code to add a delay - remove later
app.use((_req, _res, next) => setTimeout(next, 2000));

app.use(
  "/api/v1/cars",
  loggingMiddleware,
  authenticateKey,
  carRoutes
);

app.get("/ping", async (_req: Request, res: Response) => {
  res.json({
    message: "hello from Dan"
  });
});

app.get("/bananas", async (_req: Request, res: Response) => {
  res.json({
    message: "this is bananas"
  });
});

app.use(errorHandler);

export { app };