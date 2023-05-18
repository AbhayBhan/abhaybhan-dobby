import axios from 'axios';

const API_URL = "http://localhost:8000";

export const uploadImage = async (mediaData) => {
    const response = await axios.post(`${API_URL}/api/img/`, mediaData);

    return response.data;
}