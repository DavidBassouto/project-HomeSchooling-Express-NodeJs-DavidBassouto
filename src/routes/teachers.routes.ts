import { Router } from "express";

import teacherCreateController from "../controllers/teachers/teacherCreate.controller";
import teacherListAllController from "../controllers/teachers/teacherListAll.controller";
import teacherLonginController from "../controllers/teachers/teacherLogin.contoller";

const routes = Router();

export const teacherRoutes = () => {
  routes.post("", teacherCreateController);
  routes.post("/login", teacherLonginController);
  routes.get("", teacherListAllController);

  return routes;
};
