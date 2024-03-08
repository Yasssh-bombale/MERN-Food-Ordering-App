import express from "express";
import { createCurrentUser } from "../controllers/user.controller";

const router = express.Router();

router.post("/create", createCurrentUser);

export default router;
