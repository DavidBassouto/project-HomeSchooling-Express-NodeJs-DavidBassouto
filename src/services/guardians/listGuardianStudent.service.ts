import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import Student from "../../entities/student.entity";
import { AppError } from "../../errors/AppError";

const listGuardianAndStudentsService = async (id: string) => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const studentRepository = AppDataSource.getRepository(Student);

  const guardian = await guardianRepository.findOneBy({ id });

  if (!guardian) {
    throw new AppError(400, "Guardian not found");
  }

  const students = await studentRepository.findBy({ guardian });

  const result = {
    guardian,
    students: students,
  };

  return result;
};

export default listGuardianAndStudentsService;
