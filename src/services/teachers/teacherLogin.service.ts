import AppDataSource from "../../data-source";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";
import { ITeacherLogin } from "../../interfaces/teachers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const teacherLoginService = async (data: ITeacherLogin) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const teacherAccount = await teacherRepository.findOne({
    where: {
      email: data.email,
    },
  });

  if (!teacherAccount) {
    throw new AppError(403, "Wrong email/password");
  }

  if (!teacherAccount.isActive) {
    throw new AppError(401, "This account is no longer active");
  }

  const passwordMatch = bcrypt.compareSync(
    data.password,
    teacherAccount.password
  );

  if (!passwordMatch) {
    throw new AppError(403, "Wrong email/password");
  }

  const token = jwt.sign(
    { email: teacherAccount.email },
    process.env.SECRET_KEY!,
    { expiresIn: "1d", subject: teacherAccount.id }
  );

  return token;
};

export default teacherLoginService;
