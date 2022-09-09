import { instanceToPlain } from "class-transformer"
import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import teacherListAllService from "../../services/teachers/teacherListAll.service"


export const teacherListAllController = async(req: Request, res: Response) => {
    try {
        const teachersList = await teacherListAllService()

        return res.status(200).send(instanceToPlain(teachersList))

    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export default teacherListAllController