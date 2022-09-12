import AppDataSource from "../../data-source"
import Teacher from "../../entities/teacher.entity"
import { AppError } from "../../errors/AppError"


const teacherListByIdService = async (id: string) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    
    const teachers = await teacherRepository.find()

    const teacher = teachers.find( teacher => teacher.id === id)

    if(!teacher){
        throw new AppError(404, "Teacher was not found")
    }

    return teacher
}

export default teacherListByIdService