import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import { AppError } from "../../errors/AppError";
import { IGuardianReq } from "../../interfaces/guardians";

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

  const guardian = guardianRepository.create({
    id: uuid(),
    name,
    email,
    password: hashSync(password, 10),
    cellNumber,
  });

  await guardianRepository.save(guardian);

  return guardian;
};

export default createGuardianService;
