import { instanceToPlain } from "class-transformer";
import { Request,Response } from "express";
import { listAllStudentsService } from "../../services/guardians/listAllStudents.service";

export const listAllStudentsController= async(req:Request, res:Response)=>{
    const studentsList = await listAllStudentsService()
    return res.status(200).json(instanceToPlain(studentsList))       
}