import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import updateClassService from "../../services/classes/updateClass.service";

const updateClassController = async (req: Request, res: Response) => {
  const { id } = req.user;

  const { classId } = req.params;

  const { name, hour, isOpen } = req.body;

  const updatedClass = await updateClassService(id, classId, {
    name,
    hour,
    isOpen,
  });

  return res.json(instanceToPlain(updatedClass));
};

export default updateClassController;
