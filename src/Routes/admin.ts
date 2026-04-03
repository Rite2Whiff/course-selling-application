import { Router } from "express";
import { prisma } from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { adminMiddleware } from "../Middleware/adminMiddleware";

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

  const admin = await prisma.admin.create({
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

  const findAdmin = await prisma.admin.findFirst({
    where: {
      email,
    },
  });

  if (!findAdmin) {
    res.status(404).json({
      message: "Admin not found",
    });
    return;
  }

  const verifyPassword = await bcrypt.compare(password, findAdmin.password);

  if (!verifyPassword) {
    res.status(404).json({
      message: "User not found",
    });
    return;
  }

  const token = jwt.sign(
    { adminId: findAdmin.id },
    process.env.JWT_ADMIN_SECRET as string,
  );

  res.status(200).json({
    token,
    message: "You have successfully logged in",
  });
});

router.use(adminMiddleware);

router.post("/add-course", async (req, res) => {
  const adminId = req.adminId;

  if (!adminId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { title, description, price } = req.body;
  console.log(title, description, price);

  if (!title || !description || !price) {
    res.status(400).json({
      message: "Please provide the required fields",
    });
    return;
  }

  const course = await prisma.course.create({
    data: {
      adminId,
      title,
      description,
      price,
    },
  });

  res.json({
    course,
    message: "Your course was successfully added",
  });
});

export default router;
