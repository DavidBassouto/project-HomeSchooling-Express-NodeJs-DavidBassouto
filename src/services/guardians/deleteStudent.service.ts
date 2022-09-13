import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import Student from "../../entities/student.entity";
import { AppError } from "../../errors/AppError";

const deleteStudentService = async (guardianId: string, studentId: string) => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const studentRepository = AppDataSource.getRepository(Student);

  const guardian = await guardianRepository.findOneBy({ id: guardianId });

  if (!guardian) {
    throw new AppError(401, "Must be a guardian to delete a student account");
  }

  const students = await studentRepository.findBy({ guardian });

  if (!students) {
    throw new AppError(
      401,
      "Must be student's guardian to delete their account"
    );
  }

  const student = students.find((student) => student.id === studentId);

  if (!student) {
    throw new AppError(
      401,
      "Must be student's guardian to delete their account"
    );
  }

  if (!student.isActive) {
    throw new AppError(401, "Can't delete student that doesn't exist");
  }

  await studentRepository.update({ id: studentId }, { isActive: false });

  return student;
};

export default deleteStudentService;
