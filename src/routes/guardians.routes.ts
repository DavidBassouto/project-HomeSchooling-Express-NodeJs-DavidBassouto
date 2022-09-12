import { Router } from "express";
import createGuardianController from "../controllers/guardians/createGuardian.controller";
import createGuardianSessionController from "../controllers/guardians/createGuardianSession.controller";
import createStudentController from "../controllers/guardians/createStudent.controller";
import listGuardianAndStudentsController from "../controllers/guardians/listGuardianStudent.controller";
import updateGuardianController from "../controllers/guardians/updateGuardian.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import verifyIdMiddleware from "../middlewares/verifyId.middleware";

const routes = Router();

export const guardianRoutes = () => {
  routes.post("", createGuardianController);
  routes.post("/login", createGuardianSessionController);
  routes.patch("/:id", ensureAuthMiddleware,verifyIdMiddleware, updateGuardianController);
  routes.post("/students", ensureAuthMiddleware, createStudentController);
  routes.get("/:id",ensureAuthMiddleware,verifyIdMiddleware, listGuardianAndStudentsController);

  return routes;
};
