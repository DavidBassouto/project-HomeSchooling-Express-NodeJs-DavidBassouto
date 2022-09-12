import { Router } from "express";
import createGuardianController from "../controllers/guardians/createGuardian.controller";
import createGuardianSessionController from "../controllers/guardians/createGuardianSession.controller";
import updateGuardianController from "../controllers/guardians/updateGuardian.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const routes = Router();

export const guardianRoutes = () => {
  routes.post("", createGuardianController);
  routes.post("/login", createGuardianSessionController);
  routes.patch("/:id", ensureAuthMiddleware, updateGuardianController);
  
  return routes;
};
