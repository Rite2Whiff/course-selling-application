import express from "express";
import bcrypt from "bcrypt";
const router = express.Router();
import prismaClient from "../prisma.js";

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

router.post("/login", (req, res) => {});

router.get("/purchases", (req, res) => {});

export default router;
