import express, { Request, Response } from "express";
import { config } from "dotenv";
import ConnectMongoDB from "./database/Mongoose";
import userRouter from "./routers/user.router";
import cors from "cors";
const app = express();
config({
  path: ".env",
});
app.use(cors());
app.use(express.json());
app.use("/api/my/user", userRouter);

ConnectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`Backend server running on http://localhost:${process.env.PORT}`);
});
