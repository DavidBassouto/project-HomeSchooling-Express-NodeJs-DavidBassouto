import { Request, Response } from "express";
import createGuardianSessionService from "../../services/guardians/createGuardianSession.service";

const createGuardianSessionController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const token = await createGuardianSessionService(email, password);

  return res.json({ token });
};

export default createGuardianSessionController;
