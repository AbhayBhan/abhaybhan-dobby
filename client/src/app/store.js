import {configureStore} from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import mediaReducer from "../features/media/mediaSlice";

const store = configureStore({
    reducer : {
        auth : authReducer,
        media : mediaReducer
    },
});

export default store;