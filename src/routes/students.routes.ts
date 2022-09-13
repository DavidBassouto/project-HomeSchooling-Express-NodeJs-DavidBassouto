import { Router } from "express";
import studentLoginController from "../controllers/students/studentLogin.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";

const routes = Router()

export const studentsRoutes = () => {
    routes.post("/login", studentLoginController)

    return routes
}