import { Router } from "express";
import { userMiddleware } from "../Middleware/userMiddleware";
import { prisma } from "../db";

const router = Router();

router.post("/purchase", (req, res) => {});

router.get("/preview", userMiddleware, async (req, res) => {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const findUser = await prisma.user.findFirst({
    where: { id: userId },
  });

  if (!findUser) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }

  const courses = await prisma.course.findMany();

  res.status(200).json({
    courses,
  });
});

export default router;
