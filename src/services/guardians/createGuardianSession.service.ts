import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import { AppError } from "../../errors/AppError";
import "dotenv/config";

const createGuardianSessionService = async (
  email: string,
  password: string
) => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const guardian = await guardianRepository.findOneBy({ email });

  if (!guardian) {
    throw new AppError(403, "Wrong email/password");
  }

  const passwordMatch = bcrypt.compareSync(password, guardian.password);

  if (!passwordMatch) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign({ email: guardian.email }, process.env.SECRET_KEY!, 
    {
    expiresIn: "1d",
    subject: guardian.id,
  });

  return token;
};

export default createGuardianSessionService;
