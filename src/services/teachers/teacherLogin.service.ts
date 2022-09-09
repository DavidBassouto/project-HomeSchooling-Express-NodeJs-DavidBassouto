import AppDataSource from "../../data-source";
import Teacher from "../../entities/teacher.entity";
import { AppError } from "../../errors/AppError";
import { ITeacherLogin } from "../../interfaces/teachers";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export const teacherLoginService = async( data: ITeacherLogin ) => {
    const teacherRepository = AppDataSource.getRepository(Teacher)
    const teachers = await teacherRepository.find()

    const teacherAccount = teachers.find( teacher => teacher.email === data.email)

    if(!teacherAccount){
        throw new AppError(403, "Wrong email/password")
    }

    if(!teacherAccount.isActive){
        throw new AppError(401, "This account is no longer active")
    }

    if(!bcrypt.compareSync(data.password, teacherAccount.password)){
        throw new AppError(403, "Wrong email/password")
    }


    const token = jwt.sign(
        {email: data.email},
        "SECRET_KEY",
        {expiresIn: "1d", subject: teacherAccount.id}
    ) 

    return token
}

export default teacherLoginService