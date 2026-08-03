import { Router } from "express";
import { prisma } from "../lib/prisma";
import jwt from "jsonwebtoken";

const router = Router();

router.get("/", async (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  try {
    jwt.verify(token, process.env.jwtUser as string);
  } catch (error) {
    try {
      jwt.verify(token, process.env.jwtCreator as string);
    } catch (error) {
      res.status(401).json({
        message: "Unauthorized",
      });
      return;
    }
  }

  const courses = await prisma.course.findMany();

  res.status(200).json({
    courses,
  });
});

router.post("/:courseId/purchase", (req, res) => {});

export default router;
