import express from "express";
import { createCurrentUser } from "../controllers/user.controller";
import { jwtCheck } from "../middleware/auth";

const router = express.Router();

router.post("/create", jwtCheck, createCurrentUser);

export default router;
