import Router from "express";
import { prisma } from "../lib/prisma";
import { creatorSignupSchema, creatorLoginSchema } from "./creator.validation";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { userMiddleware } from "./creator.middleware";
const router = Router();

router.post("/signup", async (req, res) => {
  const result = creatorSignupSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  const { username, email, password } = result.data;
  const hashedPassword = await bcrypt.hash(password, 3);
  await prisma.creator.create({
    data: {
      username,
      email,
      password: hashedPassword,
    },
  });
  res.status(200).json({
    message: "Creator signed up successfully",
  });
});

router.post("/login", async (req, res) => {
  const result = creatorLoginSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({
      error: result.error,
    });
    return;
  }
  const { username, password } = result.data;
  const findCreator = await prisma.creator.findUnique({
    where: {
      username,
    },
  });
  if (!findCreator) {
    res.status(401).json({
      message: "Invalid username or password",
    });
    return;
  }

  const verifyCreator = await bcrypt.compare(password, findCreator.password);
  if (!verifyCreator) {
    res.status(401).json({
      message: "Invalid username or password",
    });
    return;
  }

  const token = jwt.sign(
    { userId: findCreator.id, username: findCreator.username },
    process.env.jwtCreator as string,
  );

  res.status(200).json({
    token,
  });
});

router.post("/course", (req, res) => {});

router.patch("/course/:courseId", (req, res) => {});

router.delete("/course/:courseId", (req, res) => {});

router.get("/courses", (req, res) => {});

export default router;
