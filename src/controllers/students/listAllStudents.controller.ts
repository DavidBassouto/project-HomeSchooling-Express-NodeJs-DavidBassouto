import { instanceToPlain } from "class-transformer";
import { Request,Response } from "express";
import { listAllStudentsService } from "../../services/students/listAllStudents.service";

const listAllStudentsController= async(req:Request, res:Response)=>{
    const studentsList = await listAllStudentsService()
    return res.status(200).json(instanceToPlain(studentsList))       
}

export default listAllStudentsController