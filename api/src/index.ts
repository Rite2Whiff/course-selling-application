import "dotenv/config";
import express from "express";
import userRouter from "./user/user.routes";
import creatorRouter from "./creator/creator.routes";
import courseRouter from "./course/course.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/creator", creatorRouter);
app.use("/courses", courseRouter);

app.listen(3001, () => {
  console.log("Your app is up and successully running on port 3001");
});
