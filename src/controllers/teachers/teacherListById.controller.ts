import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import teacherListByIdService from "../../services/teachers/teacherListById.service";

export const teacherListByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const teacher = await teacherListByIdService(id);

    return res.status(200).send(instanceToPlain(teacher));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default teacherListByIdController;
