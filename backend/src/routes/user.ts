import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userMiddleware } from "../middleware/userMiddleware";
import { loginSchema, signupSchema } from "../schema";

const router = Router();

router.post("/signup", async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  if (!email || !password || !firstName || !lastName) {
    res.status(400).json({
      error: "Please provide the required fields",
    });
    return;
  }

  const userInput = signupSchema.safeParse({
    email,
    password,
    firstName,
    lastName,
  });

  if (!userInput.success) {
    res.status(400).json({
      message: userInput.error.issues[0]?.message,
    });
  } else {
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
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({
      error: "Please provide valid user credentials",
    });
    return;
  }

  const userInput = loginSchema.safeParse({
    email,
    password,
  });

  if (!userInput.success) {
    res.status(400).json({
      message: userInput.error.issues[0]?.message,
    });
  } else {
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
  }
});

router.use(userMiddleware);

router.get("/purchases", async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const courses = await prisma.purchase.findMany({
    where: {
      userId,
    },
  });

  if (!courses) {
    res.json({
      message: "No courses found",
    });
    return;
  }

  res.status(200).json({
    courses,
  });
});

export default router;
