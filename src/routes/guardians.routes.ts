import { Router } from "express";
import createGuardianController from "../controllers/guardians/createGuardian.controller";
import createGuardianSessionController from "../controllers/guardians/createGuardianSession.controller";
import createStudentController from "../controllers/guardians/createStudent.controller";
import deleteStudentController from "../controllers/guardians/deleteStudent.controller";
import { listAllGuardiansController } from "../controllers/guardians/listAllGuardians.controller";
import { listAllStudentsController } from "../controllers/guardians/listAllStudents.controller";
import listGuardianAndStudentsController from "../controllers/guardians/listGuardianStudent.controller";
import  listStudentAndClassController  from "../controllers/guardians/listStudentAndClass.controller";
import updateGuardianController from "../controllers/guardians/updateGuardian.controller";
import updateStudentController from "../controllers/guardians/updateStudent.controller";
import { ensureAuthMiddleware } from "../middlewares/ensureAuth.middleware";
import verifyIdMiddleware from "../middlewares/verifyId.middleware";

const routes = Router();

export const guardianRoutes = () => {
  routes.post("", createGuardianController);
  routes.post("/login", createGuardianSessionController);
  routes.post("/students", ensureAuthMiddleware, createStudentController);

  routes.get("", listAllGuardiansController)
  routes.get("/:id",ensureAuthMiddleware,verifyIdMiddleware, listGuardianAndStudentsController);
  
  routes.patch(
    "/:id",
    ensureAuthMiddleware,
    verifyIdMiddleware,
    updateGuardianController
  );
  routes.patch(
    "/students/:studentId",
    ensureAuthMiddleware,
    updateStudentController
  );
  routes.get("", listAllGuardiansController)
  routes.get("/:id",ensureAuthMiddleware,verifyIdMiddleware, listGuardianAndStudentsController);
  routes.get("/students/list", listAllStudentsController)
  routes.get("/student/list/:id",ensureAuthMiddleware, listStudentAndClassController)

  return routes;
};
