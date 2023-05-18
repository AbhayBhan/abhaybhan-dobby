import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { uploadImage, retrieveImages } from "./mediaService";

export const upload = createAsyncThunk('media/upload', async(mediaData, thunkAPI) => {
    try{
        return await uploadImage(mediaData);
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const getImages = createAsyncThunk('media/get', async(id, thunkAPI) => {
    try{
        return await retrieveImages(id);
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

const initState = {
    isMediaLoading : false,
    isMediaError : false,
    errorMessage : "",
    images : []
}

export const mediaSlice = createSlice({
    name : "media",
    initialState : initState,
    reducers : {
        resetMedia : (state) => {
            state.images = [];
            state.isMediaError = false;
            state.errorMessage = "";
            state.isMediaLoading = false;
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(upload.pending, (state) => {
                state.isMediaLoading = true;
                state.isMediaError = false;
                state.errorMessage = "";
            })
            .addCase(upload.rejected, (state, action) => {
                state.isMediaLoading = false;
                state.isMediaError = true;
                state.errorMessage = action.payload;
            })
            .addCase(upload.fulfilled, (state,action) => {
                state.isMediaLoading = false;
                state.isMediaError = false;
                state.errorMessage = "";
                state.images.push(action.payload);
            })
            .addCase(getImages.pending, (state) => {
                state.isMediaLoading = true;
                state.isMediaError = false;
                state.errorMessage = "";
            })
            .addCase(getImages.rejected, (state, action) => {
                state.isMediaLoading = false;
                state.isMediaError = true;
                state.errorMessage = action.payload;
            })
            .addCase(getImages.fulfilled, (state, action) => {
                state.isMediaLoading = false;
                state.isMediaError = false;
                state.errorMessage = "";
                state.images = action.payload;
            })
    }
})

export const {resetMedia} = mediaSlice.actions;
export default mediaSlice.reducer;   