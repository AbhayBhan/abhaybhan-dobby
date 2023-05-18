import React, { useState, useEffect } from "react";
import Navbar from "../partials/Navbar";
import ImageUploadCard from "../partials/ImageUploadCard";
import { useSelector, useDispatch } from "react-redux";
import { getImages } from "../features/media/mediaSlice";
import ImageComponent from "../partials/ImageComponent";

const Dashboard = () => {
  const { _id } = JSON.parse(localStorage.getItem("user"));
  const [imageData, setImageData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredImages = imageData.filter((image) =>
    image.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full">
      <Navbar />
      <ImageUploadCard />
      <div className="flex flex-col items-center mt-4 mb-4">
        <input
          type="text"
          placeholder="Search by image name"
          value={searchQuery}
          onChange={handleSearchChange}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      {filteredImages.length !== 0 ? 
      <div className="flex flex-row gap-4 flex-wrap justify-center">
        {filteredImages.map((x_img) => {
          return (
            <div className="flex flex-col gap-2 items-center">
              <ImageComponent base64String={x_img.image} />
              <h1>{x_img.name}</h1>
            </div>
          );
        })}
      </div> :
      <div className="flex flex-row justify-center">
        <h1>No Images Found</h1>
      </div>}
    </div>
  );
};

export default Dashboard;
