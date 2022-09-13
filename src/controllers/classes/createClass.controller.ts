
import { instanceToPlain } from "class-transformer"
import { Request,Response } from "express"
import { IClassCreate } from "../../interfaces/classes"
import { createClassService } from "../../services/classes/createClass.service"

export const createClassController= async(req:Request, res:Response)=>{
    const {id}= req.user
    const {name, hour}:IClassCreate= req.body

    const createdClass= await createClassService({name, hour},id)

    return res.status(201).json(instanceToPlain(createdClass))

}