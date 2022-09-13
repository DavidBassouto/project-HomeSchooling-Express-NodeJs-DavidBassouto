import AppDataSource from "../../data-source"
import Class from "../../entities/class.entity"
import { AppError } from "../../errors/AppError"


export const classDeleteService = async(id: string) => {
    const classRepository = AppDataSource.getRepository(Class)
    const deleteClass = await classRepository.findOne({
        where:{
            id
        }
    })

    if(!deleteClass){
        throw new AppError(404, "Class not found")
    }

    await classRepository.delete(id)

    return deleteClass
}

export default classDeleteService