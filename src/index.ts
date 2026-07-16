import "dotenv/config";
import express from "express";
import userRouter from "./user/user.routes";

const app = express();
app.use(express.json());

app.use("/user", userRouter);

app.listen(3000, () => {
  console.log("Your app is up and successully running on port 3000");
});
