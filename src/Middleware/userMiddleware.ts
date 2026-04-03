import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.JWT_USER_SECRET as string,
  ) as JwtPayload;
  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  req.userId = decoded.userId;
  next();
};
