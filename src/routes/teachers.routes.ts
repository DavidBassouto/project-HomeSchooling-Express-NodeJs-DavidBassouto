import { Router } from "express";

import teacherCreateController from "../controllers/teachers/teacherCreate.controller";
import teacherListAllController from "../controllers/teachers/teacherListAll.controller";
import teacherLonginController from "../controllers/teachers/teacherLogin.contoller";

const routes = Router()

export const teacherRoutes = () => {

    routes.post("/teachers", teacherCreateController)
    routes.post("/teachers/login", teacherLonginController)
    routes.get("/teacher", teacherListAllController)

    return routes
}