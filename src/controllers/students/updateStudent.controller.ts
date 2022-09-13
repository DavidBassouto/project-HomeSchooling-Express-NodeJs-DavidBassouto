import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateStudentService from "../../services/students/updateStudent.service";

const updateStudentController = async (req: Request, res: Response) => {
  const { studentId } = req.params;

  const { id } = req.user;

  const { name, email, password, age } = req.body;

  const student = await updateStudentService(studentId, id, {
    email,
    name,
    password,
    age,
  });

  return res.json(instanceToPlain(student));
};

export default updateStudentController;
