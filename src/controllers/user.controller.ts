import { Request, Response } from "express";
import User from "../models/user.model";

export const createCurrentUser = async (req: Request, res: Response) => {
  try {
    const { auth0Id } = req.body;

    const isAlreadyUser = await User.findOne({ auth0Id });

    if (isAlreadyUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create(req.body);
    return res.status(201).json({
      success: true,
      user: newUser.toObject(),
    });
  } catch (error) {
    console.log(`ERROR:${error}`);
    res.status(500).json({ message: "error while creating user" });
  }
};
