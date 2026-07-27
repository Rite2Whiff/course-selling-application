import { Router } from "express";
import { userMiddleware } from "../user/user.middleware";
import { prisma } from "../lib/prisma";

const router = Router();

router.use(userMiddleware);

router.get("/", async (req, res) => {
  const courses = await prisma.course.findMany();
  res.status(200).json({
    courses,
  });
});

router.post("/:courseId/purchase", (req, res) => {});

export default router;
