import AppDataSource from "../../data-source";
import Student from "../../entities/student.entity";
import Class from "../../entities/class.entity";
import { AppError } from "../../errors/AppError";

const listStudentAndClassService = async (id:string) => {
    const studentRepository = AppDataSource.getRepository(Student)
    const classRepository = AppDataSource.getRepository(Class)

    const students = await studentRepository.findOneBy({id})
   
    if(!students) {
        throw new AppError(404, "Student not found")
    }

    const studentClass = await classRepository.findBy({students})

    const result = {
        students,
        studentClass: studentClass
    }

    return result
}

export default listStudentAndClassService