import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import listStudentAndClassService from "../../services/students/listStudentAndClass.service";


const listStudentAndClassController = async (req: Request, res: Response) => {
    const id = req.params.id

    const studentAndClassList = await listStudentAndClassService(id)

    return res.json(instanceToPlain(studentAndClassList))
}

export default listStudentAndClassController