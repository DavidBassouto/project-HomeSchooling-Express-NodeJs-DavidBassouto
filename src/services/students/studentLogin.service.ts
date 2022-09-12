import AppDataSource from "../../data-source";
import Student from "../../entities/student.entity";
import { AppError } from "../../errors/AppError";
import { IStudentLogin } from "../../interfaces/students";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";


const studentLoginService = async ({email,password} :IStudentLogin) => {

   const studentRepository =  AppDataSource.getRepository(Student)

   const findStudent = await studentRepository.findOneBy({email:email})

   if(!findStudent) {
    throw new AppError(403, "Email or password invalid")
   }

   if(!bcrypt.compareSync(password, findStudent.password)){
    throw new AppError(403, "Email or password invalid")
   }

   const token = jwt.sign({
    email: findStudent.email
   },
   process.env.SECRET_KEY as string,
   {
    expiresIn:"24h",
    subject: findStudent.id
   })

   return token

   }

export default studentLoginService