import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import teacherDeleteService from "../../services/teachers/teacherDelete.service"


export const teacherDeleteController = async (req: Request, res: Response) => {
    try {
        const {id} = req.params

        const teacher = teacherDeleteService(id)

        return res.status(200).send(teacher)
        
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export default teacherDeleteController