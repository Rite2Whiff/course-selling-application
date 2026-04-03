import "dotenv/config";
import express from "express";
import userRouter from "./Routes/user";
import courseRouter from "./Routes/course";
import adminRouter from "./Routes/admin";

const app = express();
app.use(express.json());

app.use("/api/v1/user", userRouter);

app.use("/api/v1/course", courseRouter);

app.use("/api/v1/admin", adminRouter);

app.listen(3000, () => {
  console.log("Your app is up and successfully running on port 3000");
});
