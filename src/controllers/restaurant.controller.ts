import { Request, Response } from "express";
import Restaurant from "../models/restaurant.model";

export const searchRestaurant = async (req: Request, res: Response) => {
  try {
    const { city } = req.params;

    const searchQuery = (req.query.searchQuery as string) || "";
    const selectedCuisines = (req.query.selectedCuisines as string) || "";
    const sortOption = (req.query.sortOption as string) || "lastUpdated";
    const page = parseInt(req.query.page as string) || 1;

    let query: any = {};

    query["city"] = new RegExp(city, "i"); //i becuase it will ignores London and london case;

    const cityCheck = await Restaurant.countDocuments(query); //query={city:/cityParam/i}

    if (cityCheck === 0) {
      return res.status(404).json([]);
    }

    if (selectedCuisines) {
      const cuisineArray = selectedCuisines
        .split(",")
        .map((cuisine) => new RegExp(cuisine, "i"));

      query["cuisines"] = { $all: cuisineArray }; //it will search for all elements in cuisineArray
    }

    if (searchQuery) {
      // if searchQuery=restaurantName then search for restaurant name or if cuisines are present then search for cuisine

      const searchRegEx = new RegExp(searchQuery, "i");

      query["$or"] = [
        { restaurantName: searchRegEx },
        { cuisines: { $in: [searchRegEx] } },
      ];
      //$or:[{restaurantName:searchQuery},{cuisines:searchQuery}];
    }

    const pageSize = 10;
    const skip = (page - 1) * pageSize;

    // sending req for document using query;
    // {[sortoption]:1} sortoption present in [] because it is dynamic and 1 is for ascending;

    const restaurant = await Restaurant.find(query)
      .sort({ [sortOption]: 1 })
      .skip(skip)
      .limit(pageSize)
      .lean();

    const total = await Restaurant.countDocuments(query);

    const response = {
      data: restaurant,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(`ERROR:IN searchRestaurant CONTROLLER ${error}`);
  }
};
