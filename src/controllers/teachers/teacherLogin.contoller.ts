import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import teacherLoginService from "../../services/teachers/teacherLogin.service";

export const teacherLonginController = async (req: Request, res: Response) => {
    try {
        const data = req.body
        const token = await teacherLoginService(data)

        return res.status(200).send({token})

    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export default teacherLonginController