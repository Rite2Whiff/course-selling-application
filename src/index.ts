import express from "express";
import UserRouter from "./routes/user.js";
import CourseRouter from "./routes/course.js";
import AdminRouter from "./routes/admin.js";

const app = express();
app.use(express.json());

app.use("/user", UserRouter);
app.use("/admin", AdminRouter);
app.use("/course", CourseRouter);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
