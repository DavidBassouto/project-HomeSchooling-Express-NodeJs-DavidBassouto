import AppDataSource from "../../data-source";
import Class from "../../entities/class.entity";
import Student from "../../entities/student.entity";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";

export const teacherAddStudentService = async (
  classId: string,
  email: string,
  teacherId: string
) => {
  const classRepository = AppDataSource.getRepository(Class);
  const studentRepository = AppDataSource.getRepository(Student);
  const teacherRepository = AppDataSource.getRepository(Teacher);

  const classroom = await classRepository.findOne({
    where: {
      id: classId,
    },
  });

  const studentAlreadyExistis = classroom?.students.find(
    (e) => e.email === email
  );
  if (studentAlreadyExistis) {
    throw new AppError(401, "Student already in the Class");
  }

  const student = await studentRepository.findOne({
    where: {
      email: email,
    },
  });

  const teacher = await teacherRepository.findOne({
    where: {
      id: teacherId,
    },
  });

  if (!classroom) {
    throw new AppError(404, "Classroom was not found");
  }

  if (!classroom.isOpen) {
    throw new AppError(401, "The classroom is closed");
  }

  if (!student) {
    throw new AppError(404, "Student was not found");
  }

  if (!teacher) {
    throw new AppError(404, "Teacher was not found");
  }

  if (teacher.id !== classroom.teacher.id) {
    throw new AppError(
      401,
      "Teacher must own the class in order to add students"
    );
  }

  classroom.students = [...classroom.students, student];

  await classRepository.save(classroom);

  return classroom.students;
};

export default teacherAddStudentService;
