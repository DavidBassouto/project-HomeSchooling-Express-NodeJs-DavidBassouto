import { Request, Response } from "express";
import deleteStudentService from "../../services/students/deleteStudent.service";

const deleteStudentController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const { studentId } = req.params;

  const deletedStudent = await deleteStudentService(id, studentId);

  return res.status(204).json(deletedStudent);
};

export default deleteStudentController;
