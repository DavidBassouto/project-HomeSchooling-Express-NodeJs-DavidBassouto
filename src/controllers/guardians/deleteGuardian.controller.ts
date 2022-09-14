import { Request, Response } from "express";
import { AppError } from "../../errors/AppError";
import deleteGuardianService from "../../services/guardians/deleteGuardian.service";


const deleteGuardianController = async (req: Request, res: Response) => {

    const id = req.params.id

    // if(!id){
    //     throw new AppError(404, "Guardian not found")
    // }
    
    const guardianDeleted = await deleteGuardianService(id)

    return res.status(204).json({ message: "Guardian deleted with sucess!" });

}

export default deleteGuardianController