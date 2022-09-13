import AppDataSource from "../../data-source"
import Class from "../../entities/class.entity"
import { AppError } from "../../errors/AppError"


export const classListByIdService = async (id: string) => {
    const classesRepository = AppDataSource.getRepository(Class)
    const theClass = await classesRepository.findOne({
        where:{
            id
        }
    })

    if(!theClass){
       throw new AppError(404, "Class not found")
    }

    return theClass
}

export default classListByIdService