import express from "express";
import { userMiddleware } from "../middlewares/userMIddleware.js";
import prismaClient from "../prisma.js";
const router = express.Router();

router.post("/purchase", userMiddleware, async (req, res) => {
  const userId = res.id;
  const courseId = req.body.courseId;

  if (!userId) {
    res.json("access denied");
    return;
  }

  const purchase = await prismaClient.purchase.create({
    data: {
      userId,
      courseId,
    },
  });

  res.json({
    message: "Your purchase has been successfully made",
    purchase,
  });
});

router.get("/preview", (req, res) => {});

export default router;
