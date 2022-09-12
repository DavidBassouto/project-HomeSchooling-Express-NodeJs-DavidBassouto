import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import listGuardianAndStudentsService from "../../services/guardians/listGuardianStudent.service";

const listGuardianAndStudentsController = async (
  req: Request,
  res: Response
) => {
  const { guardianId } = req.params;

  const guardianData = await listGuardianAndStudentsService(guardianId);

  return res.json(instanceToPlain(guardianData));
};

export default listGuardianAndStudentsController;
