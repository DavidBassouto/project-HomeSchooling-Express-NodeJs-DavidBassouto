import AppDataSource from "../../data-source";
import Guardian from "../../entities/guardian.entity";

export const listAllGuardiansService = async (): Promise<Guardian[]> => {
  const guardiansRepository = AppDataSource.getRepository(Guardian);
  const listAllGuardians = await guardiansRepository.find();

  return listAllGuardians;
};
