import axios from 'axios';

//IF dev environment, use localhost please
const API_URL = "https://abhay-dobby.onrender.com";

export const uploadImage = async (mediaData) => {
    const response = await axios.post(`${API_URL}/api/img/`, mediaData);

    return response.data;
}

export const retrieveImages = async (id) => {
    const response = await axios.post(`${API_URL}/api/img/getImages`, {user : id});

    return response.data;
}