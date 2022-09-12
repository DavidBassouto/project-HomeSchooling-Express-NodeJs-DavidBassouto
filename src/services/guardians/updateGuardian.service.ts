import { hash } from "bcrypt";
import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";
import { AppError } from "../../errors/AppError";
import { IGuardianUpdateReq } from "../../interfaces/guardians";

const updateGuardianService = async(id: string, {cellNumber,email,name,password}: IGuardianUpdateReq):Promise<Guardian> => {

    const guardianRepository =  AppDataSource.getRepository(Guardian)

    const findGuardian = await guardianRepository.findOneBy({
        id
    })

    if(!findGuardian){
        throw new AppError(404, "Guardian not found")
    }

    await guardianRepository.update(
        id,
        {
            cellNumber: cellNumber ?  cellNumber : findGuardian.cellNumber,
            email: email ? email : findGuardian.email,
            name: name ? name : findGuardian.name,
            password: password ? await hash(password, 10) : findGuardian.password
        }
    )

    const guardian = await guardianRepository.findOneBy({
        id
    })

    return guardian!

}

export default updateGuardianService