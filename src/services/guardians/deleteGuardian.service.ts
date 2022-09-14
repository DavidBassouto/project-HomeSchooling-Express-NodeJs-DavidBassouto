import AppDataSource from "../../data-source";
import { AppError } from "../../errors/AppError";
import Guardian from "../../entities/guardian.entity";

const deleteGuardianService = async (id:string) => {

    const guardianRepository = AppDataSource.getRepository(Guardian)

    const findGuardian =  await guardianRepository.findOneBy({id})

    if(!findGuardian) {
        throw new AppError(404, "Guardian not found")
    }

    await guardianRepository.createQueryBuilder()
    .delete()
    .from(Guardian)
    .where("id = :id", {id : findGuardian.id})
    .execute()

    const guardian = await guardianRepository.findOneBy({
        id
    })

    return guardian

}

export default deleteGuardianService