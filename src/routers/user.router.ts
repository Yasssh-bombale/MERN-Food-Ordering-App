import express from "express";
import {
  createCurrentUser,
  getCurrentUser,
  updateCurrentUser,
} from "../controllers/user.controller";
import { jwtCheck, jwtParse } from "../middleware/auth";
import { validateMyUserRequest } from "../middleware/validation";

const router = express.Router();

router.post("/create", jwtCheck, createCurrentUser);
router.put(
  "/update",
  jwtCheck,
  jwtParse,
  validateMyUserRequest,
  updateCurrentUser
);
router.get("/getCurrentUser", jwtCheck, jwtParse, getCurrentUser);
export default router;
