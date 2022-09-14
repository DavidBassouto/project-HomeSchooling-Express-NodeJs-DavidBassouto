import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IGuardianUpdateReq } from "../../interfaces/guardians";
import updateGuardianService from "../../services/guardians/updateGuardian.service";

const updateGuardianController = async( req:Request, res:Response) => {

    const id = req.params.id
    const {cellNumber,email,name,password} : IGuardianUpdateReq = req.body
    const updatedGuardian = await updateGuardianService(id,{cellNumber,email,name,password})
    return res.json(instanceToPlain(updatedGuardian))
}

export default updateGuardianController