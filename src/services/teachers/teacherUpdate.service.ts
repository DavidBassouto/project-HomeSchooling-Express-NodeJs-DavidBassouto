import AppDataSource from "../../data-source";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";
import { ITeacherUpdate } from "../../interfaces/teachers";
import bcrypt from "bcrypt";

export const teacherUpdateService = async (
  id: string,
  data: ITeacherUpdate
) => {
  const teacherRepository = AppDataSource.getRepository(Teacher);
  const teacher = await teacherRepository.findOne({
    where: {
      id,
    },
  });

  if (!teacher) {
    throw new AppError(404, "Teacher was not found");
  }

  const updateTeacher = {
    id,
    name: data.name ? data.name : teacher.name,
    email: data.email ? data.email : teacher.email,
    password: data.password
      ? bcrypt.hashSync(data.password, 10)
      : teacher.password,
    subject: data.subject ? data.subject : teacher.subject,
    bio: data.bio ? data.bio : teacher.bio,
  };

  await teacherRepository.update(teacher!.id, updateTeacher);
  const returnTeacher = await teacherRepository.findOneBy({ id });

  return returnTeacher;
};

export default teacherUpdateService;
