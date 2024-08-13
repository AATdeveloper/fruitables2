import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axiosInstance from "../../utils/axiosinstance"
// import axios from "axios";
// import { base_URL, baseURL } from "../../utils/baseURL";

const initialState = {
    isAuthentication: false,
    isLogedout: true,
    isLoading: false,
    user: [],
    error: null
}

export const register = createAsyncThunk(
    "auth/register",
    async (data, { rejectWithValue }) => {

        try {
            // console.log(data);
            const response = await axiosInstance.post( "users/useradd", data)
            // console.log(response);

            if (response.status === 201) {
                return response.data


            }

        } catch (error) {
            return rejectWithValue("registration error user already exist", error.response.data.message);

        }

    }


)


export const login = createAsyncThunk(
    'auth/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/login', data);
            console.log(response);

            if (response.status === 200) {
                return response
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Registration error: " + error.response.data.message)
        }

    }
)


export const logout = createAsyncThunk(
    'auth/logout',
    async (_id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post( 'users/logout', {_id});
            console.log(response);

            if (response.status === 200) {
                return response
            }
        } catch (error) {
            console.log(error);
            return rejectWithValue("Registration error: " + error.response.data.message)
        }

    }
)



export const authslice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(register.fulfilled, (state, action) => {
            state.isAuthentication = true
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.user = action.payload.data

        })
        bulider.addCase(register.rejected, (state, action) => {
            state.isAuthentication = false
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.user = action.payload
        })

        bulider.addCase(login.fulfilled, (state, action) => {
            state.isAuthentication = true;
            state.isLogedout = false;
            state.isLoading = false;
            state.user = action.payload.data;
            state.error = null;
        });

        bulider.addCase(login.rejected, (state, action) => {
            state.isAuthentication = false;
            state.isLogedout = true;
            state.isLoading = false;
            state.user = null;
            state.error = action.payload;
        });

        bulider.addCase(logout.fulfilled, (state, action) => {
            state.isAuthentication = false;
            state.isLogedout = true;
            state.isLoading = false;
            state.user = null;
            state.error = null;
        });

        bulider.addCase(logout.rejected, (state, action) => {
            state.isAuthentication = true;
            state.isLogedout = false;
            state.isLoading = false;
            state.error = action.payload;
        });
    }

})



export default authslice.reducer