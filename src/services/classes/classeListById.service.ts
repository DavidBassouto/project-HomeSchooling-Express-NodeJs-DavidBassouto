import AppDataSource from "../../data-source"
import Class from "../../entities/class.entity"
import { AppError } from "../../errors/AppError"
import { IClassCreate } from "../../interfaces/classes"
import { ITeacherCreate } from "../../interfaces/teachers"


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

    const classReturn : Class = {
        id: theClass.id,
        name: theClass.name,
        hour: theClass.hour,
        isOpen: theClass.isOpen,
        teacher: theClass.teacher,
        students: theClass.students
    }


    return classReturn
}

export default classListByIdService