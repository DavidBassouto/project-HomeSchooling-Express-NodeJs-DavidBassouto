import { Router } from "express";
import createGuardianController from "../controllers/guardians/createGuardian.controller";
import createGuardianSessionController from "../controllers/guardians/createGuardianSession.controller";

const routes = Router();

export const guardianRoutes = () => {
  routes.post("/", createGuardianController);
  routes.post("/login", createGuardianSessionController);

  return routes;
};
