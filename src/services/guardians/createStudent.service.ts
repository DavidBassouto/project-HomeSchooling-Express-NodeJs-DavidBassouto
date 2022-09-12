import { v4 as uuid } from "uuid";
import { hashSync } from "bcrypt";
import { IStudentsCreate } from "../../interfaces/students";
import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import Student from "../../entities/student.entity";
import { AppError } from "../../errors/AppError";

const createStudentService = async (
  id: string,
  { name, email, password, age }: IStudentsCreate
): Promise<Student> => {
  const guardianRepository = AppDataSource.getRepository(Guardian);

  const studentRepository = AppDataSource.getRepository(Student);

  const guardian = await guardianRepository.findOneBy({ id });

  if (!guardian) {
    throw new AppError(403, "Must be a guardian to register student");
  }

  const studentAlreadyExists = await studentRepository.findOneBy({ email });

  if (studentAlreadyExists) {
    throw new AppError(409, "Email already exists");
  }

  const student = studentRepository.create({
    id: uuid(),
    name,
    age,
    email,
    password: hashSync(password, 10),
    guardian: guardian,
  });

  await studentRepository.save(student);

  return student;
};

export default createStudentService;
