import { Request, Response } from "express"
import { AppError, handleError } from "../../errors/AppError"
import teacherAddStudentService from "../../services/teachers/teacherAddStudent.service"

export const teacherAddStudentController = async(req: Request, res: Response) => {
    try {
        const studentEmail = req.body
        const { classId } = req.params
        const  { id }  = req.user

        const studentAddedToTheCLassroom = await teacherAddStudentService( classId, studentEmail, id )

        return res.status(200).send(studentAddedToTheCLassroom)
    } catch (err) {
        if(err instanceof AppError){
            handleError(err, res)
        }
    }
}

export default teacherAddStudentController