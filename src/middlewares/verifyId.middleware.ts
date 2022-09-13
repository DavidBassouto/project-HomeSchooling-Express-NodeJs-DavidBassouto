import { Request, Response, NextFunction } from "express";

const verifyIdMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const idUser = req.user.id;
  const { id } = req.params;
  const compareIds = id === idUser;

  if (!compareIds) {
    return res.status(401).json({
      message: "Id provided is not authorized",
    });
  }
  next();
};

export default verifyIdMiddleware;
