import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import classListByIdService from "../../services/classes/classeListById.service";

export const classListByIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const theClass = await classListByIdService(id);

    return res.status(200).send(instanceToPlain(theClass));
  } catch (err) {
    if (err instanceof AppError) {
      handleError(err, res);
    }
  }
};

export default classListByIdController;
