import AppDataSource from "../../data-source"
import Class from "../../entities/class.entity"


export const classesListAllService = async () => {
    const classesRepository = AppDataSource.getRepository(Class)
    const classesList = await classesRepository.find()

    return classesList
}

export default classesListAllService