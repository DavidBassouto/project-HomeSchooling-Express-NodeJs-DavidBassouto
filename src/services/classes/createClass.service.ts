import { v4 as uuid } from "uuid";
import AppDataSource from "../../data-source";
import Class from "../../entities/class.entity";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";
import { IClassCreate } from "../../interfaces/classes";

export const createClassService = async (
  { name, hour }: IClassCreate,
  idTeacher: string
) => {
  const teacherRepo = AppDataSource.getRepository(Teacher);
  const classRepo = AppDataSource.getTreeRepository(Class);

  const findTeacher = await teacherRepo.findOneBy({
    id: idTeacher,
  });

  if (!findTeacher) {
    throw new AppError(401, "Teacher not found");
  }

  const createdClass = classRepo.create({
    id: uuid(),
    name,
    hour,
    students: [],
    teacher: findTeacher,
  });

  await classRepo.save(createdClass);

  return createdClass;
};
