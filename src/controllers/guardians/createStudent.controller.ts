import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import createStudentService from "../../services/guardians/createStudent.service";

const createStudentController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const { name, email, password, age } = req.body;

  const student = await createStudentService(id, {
    name,
    age,
    email,
    password,
  });

  return res.status(201).json(instanceToPlain(student));
};

export default createStudentController;
