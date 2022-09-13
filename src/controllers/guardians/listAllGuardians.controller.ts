import { instanceToPlain } from "class-transformer";
import { Request,Response } from "express";
import { listAllGuardiansService } from "../../services/guardians/listAllGuardians.service";

export const listAllGuardiansController= async(req:Request, res:Response)=>{

    const guardiansList= await listAllGuardiansService()

    return res.status(200).json(instanceToPlain(guardiansList))
        

}