import React, { useState,useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { upload } from '../features/media/mediaSlice';
import { toast } from "react-toastify";

const ImageUploadCard = () => {
  const {_id} = JSON.parse(localStorage.getItem('user'));

  const [imageName, setImageName] = useState('');
  const [imageFile, setImageFile] = useState('');

  const { isMediaLoading, isMediaError, errorMessage } = useSelector(
    (state) => state.media
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (isMediaError) {
      toast.error(errorMessage);
    }
  }, [isMediaError, errorMessage, dispatch]);

  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleImageFileChange = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImageFile(base64);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {user : _id, name : imageName, image : imageFile};
    dispatch(upload(payload));
    setImageName('');
    setImageFile("");
  };

  return (
    <div className="max-w-sm mx-auto mt-4">
        {isMediaLoading && <h1>loadingg</h1>}
      <div className="bg-white shadow-md rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">Image Upload</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="image-name"
              className="block text-gray-700 font-medium mb-2"
            >
              Image Name
            </label>
            <input
              type="text"
              id="image-name"
              value={imageName}
              onChange={handleImageNameChange}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm px-2 py-1"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="image-file"
              className="block text-gray-700 font-medium mb-2"
            >
              Image File
            </label>
            <input
              type="file"
              id="image-file"
              accept=".png"
              onChange={handleImageFileChange}
              className="border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 block w-full rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

function convertToBase64(file){
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      }
    });
  };

export default ImageUploadCard;
