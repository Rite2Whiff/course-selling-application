import Router from "express";
import { prisma } from "../lib/prisma";
import { userLoginSchema, userSignupSchema } from "./user.validation";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "./user.middleware";
const router = Router();

router.post("/signup", async (req, res) => {
  const result = userSignupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 3);
  await prisma.user.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.status(200).json({
    message: "User signed up successfully",
  });
});

router.post("/login", async (req, res) => {
  const result = userLoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  const { username, password } = result.data;
  const findUser = await prisma.user.findUnique({
    where: {
      username,
    },
  });
  if (!findUser) {
    res.status(401).json({
      message: "Invalid username or password",
    });
    return;
  }

  const verifyUser = await bcrypt.compare(password, findUser.password);
  if (!verifyUser) {
    res.status(401).json({
      message: "Invalid username or password",
    });
    return;
  }

  const token = jwt.sign(
    { userId: findUser.id, username: findUser.username },
    process.env.jwtUser as string,
  );

  res.status(200).json({
    message: "Logged in successfully",
    user: {
      id: findUser.id,
      username: findUser.username,
      email: findUser.email,
    },
    token,
  });
});

router.get("/purchases", userMiddleware, (req, res) => {
  const userId = req.userId;
});

router.get("/me", userMiddleware, async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      messgae: "Authorization token is required",
    });
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.jwtUser as string,
  ) as JwtPayload;
  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const findUser = await prisma.user.findUnique({
    where: {
      id: decoded.userId,
      username: decoded.username,
    },
  });

  if (!findUser) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  res.status(200).json({
    user: findUser,
  });
});

export default router;
