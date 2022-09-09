import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";

import createGuardianService from "../../services/guardians/createGuardian.service";

const createGuardianController = async (req: Request, res: Response) => {
  const { name, email, password, cellNumber } = req.body;

  const guardian = await createGuardianService({
    name,
    email,
    password,
    cellNumber,
  });

  return res.status(201).json(instanceToPlain(guardian));
};

export default createGuardianController;
