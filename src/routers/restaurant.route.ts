import express from "express";
import { param } from "express-validator";
import {
  getRestaurant,
  searchRestaurant,
} from "../controllers/restaurant.controller";

const router = express.Router();

router.get(
  "/:restaurantId",
  param("restaurantId")
    .trim()
    .notEmpty()
    .withMessage("restaurantId paramter must be a valid string"),
  getRestaurant
);

router.get(
  "/search/:city",
  param("city")
    .trim()
    .notEmpty()
    .withMessage("city paramter must be a valid string"),
  searchRestaurant
);

export default router;
