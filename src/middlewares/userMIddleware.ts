import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function userMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers["authorization"];
  if (!token) {
    res.json("access denied");
    return;
  }
  const decoded = jwt.verify(
    token as string,
    process.env.JWT_SECRET as string
  ) as JwtPayload;

  if (!decoded) {
    res.json("access denied");
    return;
  }

  res.id = decoded.id;
  next();
}
