import { Request, Response } from "express";
import teacherCreateService from "../../services/teachers/teacherCreate.service";
import { AppError, handleError } from "../../errors/AppError";
import { instanceToPlain } from "class-transformer";

const teacherCreateController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const newTeacher = await teacherCreateService(data);

    return res.status(201).json(instanceToPlain(newTeacher));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default teacherCreateController;
