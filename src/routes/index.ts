import { Express } from "express";
import { classesRoutes } from "./classes.routes";
import { guardianRoutes } from "./guardians.routes";
import { teacherRoutes } from "./teachers.routes";

export const appRoutes = (app: Express) => {
  app.use("/guardians", guardianRoutes());
  app.use("/teachers", teacherRoutes());
  app.use("/classes", classesRoutes());
};
