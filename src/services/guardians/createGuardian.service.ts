import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";

import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import { AppError } from "../../errors/AppError";
import { IGuardianReq } from "../../interfaces/guardian.interfaces";

const createGuardianService = async ({
  name,
  email,
  password,
  cellNumber,
}: IGuardianReq): Promise<Guardian> => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const emailAlreadyExists = await guardianRepository.findOneBy({ email });

  if (emailAlreadyExists) {
    throw new AppError(409, "Email already exists");
  }

  const guardian = await guardianRepository.save({
    id: uuid(),
    name,
    email,
    password: hashSync(password, 10),
    cellNumber,
  });

  return guardian;
};

export default createGuardianService;
