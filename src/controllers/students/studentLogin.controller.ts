import { Response, Request } from "express";
import studentLoginService from "../../services/students/studentLogin.service";

const studentLoginController = async( req: Request, res: Response) => {

    const {email, password} = req.body

    const token = await studentLoginService({email, password})

    return res.status(200).json({token:token})

}

export default studentLoginController