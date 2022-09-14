import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { AppError, handleError } from "../../errors/AppError";
import classesListAllService from "../../services/classes/classesListAll.service";

export const classesListAllController = async(req: Request, res: Response) => {
    try {
        const classesList = await classesListAllService()

        return res.status(200).send(instanceToPlain(classesList))
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export default classesListAllController