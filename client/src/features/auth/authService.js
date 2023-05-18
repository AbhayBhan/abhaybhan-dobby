import axios from 'axios';

//IF dev environment, use localhost please
const API_URL = "https://abhay-dobby.onrender.com";

export const registerUser = async (userData) => {
    const response = await axios.post(`${API_URL}/api/user/`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

export const loginUser = async (userData) => {
    const response = await axios.post(`${API_URL}/api/user/login`, userData);

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data));
    }

    return response.data;
}

export const logoutUser = async () => {
    await localStorage.removeItem('user');
}