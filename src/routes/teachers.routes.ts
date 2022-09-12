import { Router } from "express";

import teacherCreateController from "../controllers/teachers/teacherCreate.controller";
import teacherDeleteController from "../controllers/teachers/teacherDelete.controller";
import teacherListAllController from "../controllers/teachers/teacherListAll.controller";
import teacherListByIdController from "../controllers/teachers/teacherListById.controller";
import teacherLonginController from "../controllers/teachers/teacherLogin.contoller";

const routes = Router()

export const teacherRoutes = () => {

    routes.post("/teachers", teacherCreateController)
    routes.post("/teachers/login", teacherLonginController)
    routes.get("/teachers", teacherListAllController)
    routes.get("/teachers/:id", teacherListByIdController)
    routes.delete("/teachers/:id", teacherDeleteController)

    return routes
}