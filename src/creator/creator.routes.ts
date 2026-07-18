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
    { creatorId: findCreator.id, username: findCreator.username },
    process.env.jwtCreator as string,
  );

  res.status(200).json({
    token,
  });
});

router.use(userMiddleware);

router.post("/course", userMiddleware, async (req, res) => {
  const creatorId = req.creatorId;
  const { title, description, price } = req.body;

  const course = await prisma.course.create({
    data: {
      title,
      description,
      price,
      creatorId,
    },
  });

  res.status(200).json({
    message: "Your course has been successfully created",
    course,
  });
});

router.patch("/course/:courseId", async (req, res) => {
  const creatorId = req.creatorId;

  const course = await prisma.course.findUnique({
    where: {
      id: Number(req.params.courseId),
    },
  });

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  if (course.creatorId !== creatorId) {
    res.status(403).json({
      message: "You are not authorized to edit this course",
    });
    return;
  }

  const { title, description, price } = req.body;

  const updateCourse = await prisma.course.update({
    where: {
      id: creatorId,
    },
    data: {
      title,
      description,
      price,
    },
  });

  res.status(200).json({
    message: "Your course has been successfully updated",
    updateCourse,
  });
});

router.delete("/course/:courseId", (req, res) => {});

router.get("/courses", async (req, res) => {
  const creatorId = req.creatorId;

  const courses = await prisma.course.findMany({
    where: {
      creatorId,
    },
  });

  if (!courses) {
    res.status(200).json({
      message: "No courses found",
      courses: {},
    });
    return;
  }

  res.status(200).json({
    message: "Your courses",
    courses,
  });
});

export default router;
