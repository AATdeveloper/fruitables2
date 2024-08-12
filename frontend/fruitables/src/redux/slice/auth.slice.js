import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";
import { base_URL, baseURL } from "../../utils/baseURL";

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
            const response = await axios.post(base_URL + "users/useradd", data)
            // console.log(response);

            if (response.status === 201) {
                return response.data


            }

        } catch (error) {
            return rejectWithValue("registration error user already exist", error.response.data.message);

        }

    }


)
export const authslice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (bulider) => {
        bulider.addCase(register.fulfilled, (state, ation) => {
            state.isAuthentication = true
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.user = ation.payload.data

        })
        bulider.addCase(register.rejected, (state, ation) => {
            state.isAuthentication = false
            state.isLogedout = true
            state.isLoading = false
            state.error = null
            state.user = ation.payload
        })
    }

})

export default authslice.reducer