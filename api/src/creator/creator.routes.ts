import Router from "express";
import { prisma } from "../lib/prisma";
import { creatorSignupSchema, creatorLoginSchema } from "./creator.validation";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import { creatorMiddleware } from "./creator.middleware";
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
    include: {
      courses: true,
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
    message: "Creator signed up successfully",
    token,
    creator: {
      username: findCreator.username,
      email: findCreator.username,
    },
    courses: findCreator.courses,
  });
});

router.use(creatorMiddleware);

router.post("/course", async (req, res) => {
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
  const { title, description, price } = req.body;
  const course = await prisma.course.updateMany({
    where: {
      id: Number(req.params.courseId),
      creatorId,
    },
    data: {
      title,
      description,
      price,
    },
  });

  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  res.status(200).json({
    message: "Course successfully edited",
    course,
  });
});

router.delete("/course/:courseId", async (req, res) => {
  const creatorId = req.creatorId;
  const course = await prisma.course.deleteMany({
    where: {
      id: Number(req.params.courseId),
      creatorId,
    },
  });
  if (!course) {
    res.status(404).json({
      message: "Course not found",
    });
    return;
  }

  res.status(200).json({
    message: "Course deleted",
  });
});

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
    });
    return;
  }

  res.status(200).json({
    message: "Your courses",
    courses,
  });
});

router.get("/me", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      messgae: "Authorization token is required",
    });
    return;
  }
  const decoded = jwt.verify(
    token,
    process.env.jwtCreator as string,
  ) as JwtPayload;
  if (!decoded) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const findCreator = await prisma.creator.findUnique({
    where: {
      id: decoded.userId,
      username: decoded.username,
    },
    include: {
      courses: true,
    },
  });

  if (!findCreator) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  res.status(200).json({
    creator: {
      username: findCreator.username,
      email: findCreator.email,
      courses: findCreator.courses,
    },
  });
});

export default router;
