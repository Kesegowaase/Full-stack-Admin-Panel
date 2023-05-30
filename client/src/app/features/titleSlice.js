import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllTitlesRequest } from "../../api/apiTitleCalls";

export const fetchAsyncTitle = createAsyncThunk(
    "title/fetchAsyncTitle",
    async (token) => {
        const response = await getAllTitlesRequest(token);
        /* console.log(response.data); */
        return response.data;
    }
);

const initialState = {
    titles: [],
};

const titleSlice = createSlice({
    name: "title",
    initialState,
    reducers: {
        addNewTitle: (state, action) => {
            state.titles = [...state.titles, action.payload];
        },
        updateTitle: (state, action) => {
            const updatedTitle = state.titles.map(title => {
                if (title._id === action.payload._id) {
                    return { ...title, ...action.payload }
                }
                return title
            })
            state.titles = updatedTitle
        },
        deleteTitle: (state, action) => {
            const deleteTitle = state.titles.filter(title => {
                return title._id !== action.payload._id
            })
            state.titles = deleteTitle
        },
        logoutT: (state) => {
            state.titles = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAsyncTitle.fulfilled, (state, action) => {
            /* console.log("Fetched Successfully!"); */
            return { titles: action.payload };
        });
        builder.addCase(fetchAsyncTitle.rejected, (state, action) => {
            /* console.log("Rejected!"); */
        });
    }
});

export const { addNewTitle, updateTitle, deleteTitle, logoutT } = titleSlice.actions;

export const getTitles = (state) => state.title.titles;

export default titleSlice.reducer;