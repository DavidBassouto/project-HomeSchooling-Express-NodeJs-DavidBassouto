import { Router } from "express";
import classDeleteController from "../controllers/classes/classDelete.controller";
import classesListAllController from "../controllers/classes/classesListAll.controller";
import classListByIdController from "../controllers/classes/classListById.controller";
import { createClassController } from "../controllers/classes/createClass.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const routes = Router();

export const classesRoutes = () => {
  routes.post("", ensureAuthMiddleware, createClassController);
  routes.get("", classesListAllController)
  routes.get("/:id", classListByIdController)
  routes.delete("/:id", classDeleteController)

  return routes;
};
