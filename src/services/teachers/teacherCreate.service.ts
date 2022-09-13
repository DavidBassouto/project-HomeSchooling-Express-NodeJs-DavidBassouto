import { ITeacherCreate } from "../../interfaces/teachers";
import AppDataSource from "../../data-source";
import Teacher from "../../entities/teacher.entity";
import bcrypt from "bcrypt"
import {v4 as uuid} from "uuid"
import { AppError } from "../../errors/AppError";

const teacherCreateService = async ( data: ITeacherCreate) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    const teachers = await teacherRepository.find()

    const emailAlreadyInUse = teachers.find( teacher => teacher.email === data.email)
    if(emailAlreadyInUse){
        throw new AppError(400, "This email is already being used")
    }

    const newTeacher = new Teacher()
    newTeacher.id = uuid()
    newTeacher.name = data.name
    newTeacher.email = data.email
    newTeacher.password = bcrypt.hashSync( data.password, 10)
    newTeacher.bio = data.bio
    newTeacher.subject = data.subject

    teacherRepository.create(newTeacher)
    await teacherRepository.save(newTeacher)

    return newTeacher
}

export default teacherCreateService