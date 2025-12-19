import express from "express";
import UserRouter from "./routes/user.js";
import CourseRouter from "./routes/course.js";

const app = express();

app.use("/user", UserRouter);

app.use("/course", CourseRouter);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
