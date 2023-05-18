import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { registerUser, loginUser, logoutUser } from "./authService";

const user = JSON.parse(localStorage.getItem('user'));

export const register = createAsyncThunk('auth/register', async (userData, thunkAPI) => {
    try{
        return await registerUser(userData);
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const login = createAsyncThunk('auth/login', async (userData, thunkAPI) => {
    try{
        return await loginUser(userData);
    }catch(err){
        const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

export const logout = createAsyncThunk('auth/logout', async(thunkAPI) => {
    await logoutUser();
})

const initState = {
    user : user ? user : null,
    isError : false,
    isSuccess : false,
    isLoading : false,
    message : ""
};

export const authSlice = createSlice({
    name : "auth",
    initialState : initState,
    reducers : {
        reset : (state) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = false;
            state.message = "";
        }
    },
    extraReducers : (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    }
})

export const {reset} = authSlice.actions;
export default authSlice.reducer;   