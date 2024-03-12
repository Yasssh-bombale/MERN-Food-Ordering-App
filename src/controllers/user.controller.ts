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
export const updateCurrentUser = async (req: Request, res: Response) => {
  try {
    const { addressLine1, name, city, country } = req.body;
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "No user found" });
    }
    user.addressLine1 = addressLine1;
    user.name = name;
    user.city = city;
    user.country = country;
    await user.save();
    res.send(user);
  } catch (error) {
    console.log(`ERROR:${error}`);
    return res.status(500).json({ message: "Error while updating user" });
  }
};
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req;
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(`ERROR:${error}`);
    res.status(500).json({ message: "Something went wrong" });
  }
};
