import { Express } from "express";
import { guardianRoutes } from "./guardians.routes";
import { teacherRoutes } from "./teachers.routes";

export const appRoutes = (app: Express) => {
  app.use("/guardians", guardianRoutes());
  app.use("/teachers", teacherRoutes);
};
