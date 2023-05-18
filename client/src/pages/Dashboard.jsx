import React, { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import ImageUploadCard from "../partials/ImageUploadCard";
import { useSelector, useDispatch } from "react-redux";
import { getImages } from "../features/media/mediaSlice";
import ImageComponent from "../partials/ImageComponent";

const Dashboard = () => {
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const [imageData, setImageData] = useState([]);

  const dispatch = useDispatch();

  const { images, isMediaLoading, isMediaError, errorMessage } = useSelector(
    (state) => state.media
  );

  useEffect(() => {
    dispatch(getImages(_id));
  }, []);

  useEffect(() => {
    setImageData(images);
  }, [images]);

  return (
    <div className="w-full">
      <Navbar />
      <ImageUploadCard />
      <div className="flex flex-row gap-4 flex-wrap justify-center">
      {imageData.map((x_img) => {
        return (
          <div className="flex flex-col gap-2 items-center">
            <ImageComponent base64String={x_img.image} />
            <h1>{x_img.name}</h1>
          </div>
        );
      })}
      </div>
    </div>
  );
};

export default Dashboard;
