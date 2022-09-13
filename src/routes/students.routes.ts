import { Router } from "express";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import  listAllStudentsController  from "../controllers/students/listAllStudents.controller";
import studentLoginController from "../controllers/students/studentLogin.controller";
import listStudentAndClassController from "../controllers/students/listStudentAndClass.controller";
import updateStudentController from "../controllers/students/updateStudent.controller";
import deleteStudentController from "../controllers/students/deleteStudent.controller";

const routes = Router()

export const studentsRoutes = () => {
    routes.post("/login", studentLoginController)
    routes.get("/list", listAllStudentsController)
    routes.get("/list/:id",ensureAuthMiddleware, listStudentAndClassController)
    routes.patch("/:studentId", ensureAuthMiddleware, updateStudentController);

    return routes
}