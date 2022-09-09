import "reflect-metadata";
import "express-async-errors";
import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./errors/AppError";
import { appRoutes } from "./routes";

const app = express();
app.use(express.json());
appRoutes(app);

app.use(
  (err: Error, resquest: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: "error",
        message: err.message,
      });
    }
    console.error(err);
    return response.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
);

export default app;
