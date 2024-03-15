import express from "express";
import multer from "multer";
import { createMyRestaurant } from "../controllers/MyRestaurant.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //5 mega bytes;
  },
});

router.post(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  createMyRestaurant
);

export default router;
