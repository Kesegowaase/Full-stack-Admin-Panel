import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postSigninRequest } from "../../api/apiUserCalls";

export const fetchAsyncUser = createAsyncThunk(
    "user/fetchAsyncUser",
    async (data) => {
        const response = await postSigninRequest(data);
        return response.data;
    }
);

const initialState = {
    username: "",
    token: "",
    isLogin: false,
};

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logoutU: (state, action) => {
            return { username: "", token: "", isLogin: false };
        }
    },
    extraReducers(builder) {
        /* builder.addCase(fetchAsyncUser.pending, (state, action) => {
            console.log("Pending");
        }); */
        builder.addCase(fetchAsyncUser.fulfilled, (state, action) => {
            /* console.log("Fetched Successfully!"); */
            return { ...action.payload, isLogin: true };
        });
        builder.addCase(fetchAsyncUser.rejected, (state, action) => {
            /* console.log("Rejected!"); */
        });
    }
});

export const getUsername = (state) => state.user.username;
export const getLogin = (state) => state.user.isLogin;
export const getToken = (state) => state.user.token;

export const { logoutU } = userSlice.actions;

export default userSlice.reducer;