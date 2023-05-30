import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllStoresRequest } from "../../api/apiStoreCalls";

export const fetchAsyncStore = createAsyncThunk(
    "store/fetchAsyncStore",
    async (token) => {
        const response = await getAllStoresRequest(token);
        /* console.log(response.data); */
        return response.data;
    }
);

const initialState = {
    stores: [],
};

const storeSlice = createSlice({
    name: "store",
    initialState,
    reducers: {
        addNewStore: (state, action) => {
            state.stores = [...state.stores, action.payload];
        },
        updateStore: (state, action) => {
            const updatedStore = state.stores.map(store => {
                if (store._id === action.payload._id) {
                    return { ...store, ...action.payload }
                }
                return store;
            })
            state.stores = updatedStore;
        },
        deleteStore: (state, action) => {
            const deleteStore = state.stores.filter(store => {
                return store._id !== action.payload._id
            })
            state.stores = deleteStore
        },
        logoutS: (state) => {
            state.stores = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAsyncStore.fulfilled, (state, action) => {
            /* console.log("Fetched Successfully!"); */
            return { stores: action.payload };
        });
        builder.addCase(fetchAsyncStore.rejected, (state, action) => {
            /* console.log("Rejected!"); */
        });
    }
});

export const { addNewStore, updateStore, deleteStore, logoutS } = storeSlice.actions;

export const getStores = (state) => state.store.stores;

export default storeSlice.reducer;