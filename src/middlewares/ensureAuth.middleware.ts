import { Request, Response, NextFunction } from "express";
import Jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token || token.split(" ")[1] === undefined) {
    return res.status(401).json({
      message: "Invalid token",
    });
  }

  token = token.split(" ")[1];

  Jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error: any, decoded: any) => {
      if (error) {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
      req.user = {
        id: decoded.sub,
      };
      next();
    }
  );
};
