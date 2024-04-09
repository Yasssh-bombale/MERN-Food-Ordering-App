import express from "express";
import { param } from "express-validator";
import { searchRestaurant } from "../controllers/restaurant.controller";

const router = express.Router();

router.get(
  "/search/:city",
  param("city")
    .trim()
    .notEmpty()
    .withMessage("city paramter must be a valid string"),
  searchRestaurant
);

export default router;
