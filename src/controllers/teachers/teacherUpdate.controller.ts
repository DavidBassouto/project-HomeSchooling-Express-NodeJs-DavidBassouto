import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import teacherUpdateService from "../../services/teachers/teacherUpdate.service";

export const teacherUpdateController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updatedTeacher = await teacherUpdateService(id, data);

    return res.status(200).send(instanceToPlain(updatedTeacher));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default teacherUpdateController;
