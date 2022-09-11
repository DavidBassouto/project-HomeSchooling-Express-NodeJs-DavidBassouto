import { Router } from "express";
import createGuardianController from "../controllers/guardians/createGuardian.controller";

const routes = Router();

export const guardianRoutes = () => {
  routes.post("", createGuardianController);

  return routes;
};
