import AppDataSource from "../../data-source"
import Teacher from "../../entities/teacher.entity"


export const teacherListAllService = async() => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    const teacherList = await teacherRepository.find()

    return teacherList
}

export default teacherListAllService