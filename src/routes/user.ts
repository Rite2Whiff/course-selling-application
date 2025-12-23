import express, { Request } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma.js";
import { userMiddleware } from "../middlewares/userMIddleware.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;

  if (!email || !password || !firstName || !lastName) {
    res.json("Please enter valid user credentias");
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 4);
  const user = await prismaClient.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });
  res.json({
    message: "User has successfully signed up",
    user,
  });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.json("Please fill all the fields and try logging again");
    return;
  }

  const foundUser = await prismaClient.user.findUnique({
    where: {
      email,
    },
  });

  if (!foundUser) {
    res.json("Invalid user credentials");
    return;
  }

  const verifyPassword = await bcrypt.compare(password, foundUser.password);

  if (!verifyPassword) {
    res.json("Invalid user password");
    return;
  }

  const token = jwt.sign(
    { id: foundUser.id },
    process.env.JWT_SECRET_USER as string
  );

  res.json({
    token,
  });
});

router.get("/purchases", userMiddleware, async (req: Request, res) => {
  const userId = res.id;
  const token = req.headers.authorization;

  if (!userId || !token) {
    res.json("access denied");
  }

  const user = await prismaClient.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.json("Please login again to see your purchases");
    return;
  }

  res.json("Your purchases");
});

export default router;
