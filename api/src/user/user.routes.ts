import Router from "express";
import { prisma } from "../lib/prisma";
import { userLoginSchema, userSignupSchema } from "./user.validation";
import jwt from "jsonwebtoken";
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
    token,
  });
});

router.get("/purchases", userMiddleware, (req, res) => {
  const userId = req.userId;
});

export default router;
