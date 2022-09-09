import { Express } from "express";
import { guardianRoutes } from "./guardians.routes";

export const appRoutes = (app: Express) => {
  app.use("/guardians", guardianRoutes());
};

