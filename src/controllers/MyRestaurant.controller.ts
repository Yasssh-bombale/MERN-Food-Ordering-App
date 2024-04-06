import { NextFunction, Request, Response } from "express";
import Restaurant from "../models/restaurant.model";
import cloudinary from "cloudinary";
import mongoose from "mongoose";

export const getMyRestaurant = async (req: Request, res: Response) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({
        message: "No restaurant found!",
      });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);
  }
};

export const createMyRestaurant = async (req: Request, res: Response) => {
  try {
    const existingRestaurant = await Restaurant.findOne({ user: req.userId });

    if (existingRestaurant) {
      return res
        .status(409)
        .json({ message: "User restaurant already exists" });
    }

    // const image = req.file as Express.Multer.File;
    // const base64Image = Buffer.from(image.buffer).toString("base64");
    // const dataURI = `data:${image.mimetype};base64,${base64Image}`; //encoded image to base64Image
    // const uploadResponse = await cloudinary.v2.uploader.upload(dataURI); //uploading base64Image to cloudinary;
    const imageURL = await uploadImage(req.file as Express.Multer.File);

    const restaurant = new Restaurant(req.body);
    restaurant.imageUrl = imageURL;
    restaurant.user = new mongoose.Types.ObjectId(req.userId);
    restaurant.lastUpdated = new Date();

    await restaurant.save();

    return res.status(201).send(restaurant);
  } catch (error) {
    console.log(`ERROR:${error}`);
    return res
      .status(500)
      .json({ message: "ERROR: While creating restaurant" });
  }
};

export const updateMyRestaurant = async (req: Request, res: Response) => {
  try {
    const {
      restaurantName,
      city,
      country,
      deliveryPrice,
      estimatedDeliveryTime,
      cuisines,
      menuItems,
    } = req.body;

    const restaurant = await Restaurant.findOne({ user: req.userId });

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found!" });
    }

    restaurant.restaurantName = restaurantName;
    restaurant.city = city;
    restaurant.country = country;
    restaurant.deliveryPrice = deliveryPrice;
    restaurant.estimatedDeliveryTime = estimatedDeliveryTime;
    restaurant.cuisines = cuisines;
    restaurant.menuItems = menuItems;
    restaurant.lastUpdated = new Date();

    if (req.file) {
      const imageURL = await uploadImage(req.file as Express.Multer.File);
      restaurant.imageUrl = imageURL;
    }

    await restaurant.save();

    return res.status(200).send(restaurant);
  } catch (error) {
    console.log(`ERROR:While updating restaurant! ${error}`);
    res
      .status(500)
      .json({ message: "ERROR:Internal ERROR ! in UpdateMyRestaurantRoute" });
  }
};

const uploadImage = async (file: Express.Multer.File) => {
  const image = file;
  const base64Image = Buffer.from(image.buffer).toString("base64");
  const dataURI = `data:${image.mimetype};base64,${base64Image}`; //encoded image to base64Image
  const uploadResponse = await cloudinary.v2.uploader.upload(dataURI); //uploading base64Image to cloudinary;
  return uploadResponse.url;
};
