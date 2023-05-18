import asyncHandler from "express-async-handler";
import imageModel from "../models/imageModel.js";

export const uploadImage = asyncHandler(async (req, res) => {
  const body = req.body;
  try{
    const newImage = await imageModel.create(body);
    newImage.save();
    res.statusCode(200).send("Uploaded!");
  }catch(err){
    throw new Error(err);
  }
});
