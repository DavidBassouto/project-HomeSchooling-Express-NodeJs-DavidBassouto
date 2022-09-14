import AppDataSource from "../../data-source"
import Teacher from "../../entities/teacher.entity"
import { AppError } from "../../errors/AppError"

export const teacherDeleteService = async (id: string, userId:string) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    
    // if(id!==userId){
    //     throw new AppError(404, "Teacher was not found")
    // }


    const deleteTeacher = await teacherRepository.findOne({
        where:{
            id
        }
    })

    if(!deleteTeacher){
        throw new AppError(404, "Teacher was not found")
    }

    await teacherRepository.delete(id)

    return deleteTeacher
} 

export default teacherDeleteService