import express, { Request, Response } from "express";
import { config } from "dotenv";
import ConnectMongoDB from "./database/Mongoose";
import userRouter from "./routers/user.route";
import MyRestaurantRouter from "./routers/MyRestaurant.route";
import restaurantRouter from "./routers/restaurant.route";
import orderRouter from "./routers/OrderRoute";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";

const app = express();
config({
  path: ".env",
});
// Cloudinary configuration;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

app.use(cors());
app.use(express.json());
app.use("/api/my/user", userRouter);
app.use("/api/my/restaurant", MyRestaurantRouter);
app.use("/api/restaurant", restaurantRouter);
app.use("/api/order", orderRouter);

// health;
app.get("/health", (req: Request, res: Response) => {
  return res.sendStatus(200);
});

ConnectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`Backend server running on http://localhost:${process.env.PORT}`);
});
