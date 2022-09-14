import AppDataSource from "../../data-source";
import Student from "../../entities/student.entity";

export const listAllStudentsService = async () =>{
    const studentRepository = AppDataSource.getRepository(Student)
    const listAllStudents = await studentRepository.find()

    return listAllStudents
}