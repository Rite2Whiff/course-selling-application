import express from "express";
import userRouter from "./Routes/user";
import courseRouter from "./Routes/course";

const app = express();

app.use("/api/v1/user", userRouter);

app.use("/api/v1/course", courseRouter);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
