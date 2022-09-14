import AppDataSource from "../../data-source";
import Class from "../../entities/class.entity";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";
import { IClassUpdate } from "../../interfaces/classes";

const updateClassService = async (
  reqId: string,
  classId: string,
  data: IClassUpdate
) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const classRepository = AppDataSource.getRepository(Class);

  const teacher = await teacherRepository.findOneBy({ id: reqId });

  if (!teacher) {
    throw new AppError(401, "Must be teacher to edit class");
  }

  const reqClass = await classRepository.findOneBy({ id: classId });

  if (!reqClass) {
    throw new AppError(404, "Class not found");
  }

  if (reqClass.teacher.id !== teacher.id) {
    throw new AppError(401, "Teacher must own class to edit it");
  }

  await classRepository.save({ ...data, id: classId });

  const returnedClass = await classRepository.findOneBy({ id: classId });

  return returnedClass;
};

export default updateClassService;
