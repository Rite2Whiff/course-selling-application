import express from "express";
import brcypt from "bcrypt";
import prismaClient from "../prisma.js";
import jwt from "jsonwebtoken";
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

  const hashedPassword = await brcypt.hash(password, 4);

  const courseInstructor = await prismaClient.instructor.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
    },
  });

  res.json({
    message: "Instructor successfully signed up",
    courseInstructor,
  });
});

router.post("/login", async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    res.json("Please enter valid user crendentials");
    return;
  }

  const foundInstructor = await prismaClient.instructor.findUnique({
    where: {
      email,
    },
  });

  if (!foundInstructor) {
    res.json("Invalid user credentials");
    return;
  }

  const verifyPassword = await brcypt.compare(
    password,
    foundInstructor.password
  );

  if (!verifyPassword) {
    res.json("Invalid user password");
    return;
  }

  const token = jwt.sign(
    { id: foundInstructor.id },
    process.env.JWT_SECRET_INSTRUCTOR as string
  );

  res.json({
    token,
  });
});

router.post("/course", (req, res) => {});

router.put("/course", (req, res) => {});

router.get("/course", (req, res) => {});

router.delete("/course", (req, res) => {});

export default router;
