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

router.patch("/edit-course", async (req, res) => {
  const adminId = req.adminId;
  if (!adminId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const { title, description, price, courseId } = req.body;

  if (!req.body) {
    res.status(400).json({
      message: "Please provide the fields to update",
    });
    return;
  }

  const findCourse = await prisma.course.findFirst({
    where: {
      id: courseId,
    },
  });

  if (!findCourse) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  const updateCourse = await prisma.course.update({
    where: {
      id: courseId,
    },
    data: {
      title: title ? title : findCourse.title,
      description: description ? description : findCourse.description,
      price: price ? price : findCourse.price,
    },
  });

  res.status(200).json({
    updateCourse,
    message: "Your course has been successfully updated",
  });
});

router.delete("/delete-course", async (req, res) => {
  const adminId = req.adminId;
  if (!adminId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const courseId = req.body.courseId;

  if (!courseId) {
    res.status(404).json({
      message: "Course not found ",
    });
    return;
  }

  await prisma.course.delete({
    where: {
      id: courseId,
      adminId,
    },
  });

  res.status(200).json({
    message: "Course successfully removed",
  });
});

router.get("/course-preview", async (req, res) => {
  const adminId = req.adminId;
  if (!adminId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const courses = await prisma.course.findMany({
    where: {
      adminId,
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
