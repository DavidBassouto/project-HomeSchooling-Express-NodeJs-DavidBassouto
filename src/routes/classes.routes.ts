import { Router } from "express";
import { createClassController } from "../controllers/classes/createClass.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const routes = Router();

export const classesRoutes = () => {
  routes.post("", ensureAuthMiddleware, createClassController);

  return routes;
};
