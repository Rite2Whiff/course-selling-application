import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({
      error: "Please provide the required fields",
    });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 3);

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });

  res.status(200).json({
    message: "You have successfully signed up",
  });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Please provide valid user credentials",
    });
    return;
  }

  const findUser = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!findUser) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const verifyPassword = await bcrypt.compare(password, findUser.password);

  if (!verifyPassword) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const token = jwt.sign(
    { userId: findUser.id },
    process.env.JWT_USER_SECRET as string,
  );

  res.status(200).json({
    token,
    message: "You have successfully logged in",
  });
});

router.get("/purchases", (req, res) => {});

export default router;
