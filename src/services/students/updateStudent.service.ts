import { hashSync } from "bcrypt";
import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import Student from "../../entities/student.entity";
import { AppError } from "../../errors/AppError";
import { IStudentsCreate } from "../../interfaces/students";

const updateStudentService = async (
  studentId: string,
  guardianId: string,
  { email, name, password, age }: IStudentsCreate
): Promise<Student> => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const studentRepository = AppDataSource.getRepository(Student);

  const guardian = await guardianRepository.findOneBy({ id: guardianId });

  if (!guardian) {
    throw new AppError(400, "Guardian not found");
  }

  const students = await studentRepository.findBy({ guardian });

  const student = students.find((student) => student.id === studentId);

  if (!student) {
    throw new AppError(401, "Student not found");
  }

  await studentRepository.update(
    { id: studentId },
    {
      name: name ? name : student.name,
      age: age ? age : student.age,
      email: email ? email : student.email,
      password: password ? hashSync(password, 10) : student.password,
    }
  );

  const updatedStudent = await studentRepository.findOneBy({ id: studentId });

  return updatedStudent!;
};

export default updateStudentService;
