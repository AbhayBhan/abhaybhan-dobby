import asyncHandler from "express-async-handler";
import imageModel from "../models/imageModel.js";

export const uploadImage = asyncHandler(async (req, res) => {
  const body = req.body;
  try{
    const newImage = await imageModel.create(body);
    newImage.save();
    res.status(200).json(newImage);
  }catch(err){
    throw new Error(err);
  }
});


export const getImages = asyncHandler(async (req,res) => {
  const {user} = req.body;
  try{
    const Images = await imageModel.find({user : user});
    res.status(200).json(Images);
  }catch(err){
    throw new Error(err);
  }
})