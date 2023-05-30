import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAllConsumablesRequest } from "../../api/apiConsumableCalls";

export const fetchAsyncConsumable = createAsyncThunk(
    "consumable/fetchAsyncConsumable",
    async (token) => {
        const response = await getAllConsumablesRequest(token);
        /* console.log(response.data); */
        return response.data;
    }
);

const initialState = {
    consumables: [],
};

const consumableSlice = createSlice({
    name: "consumable",
    initialState,
    reducers: {
        addNewConsumable: (state, action) => {
            state.consumables = [...state.consumables, action.payload];
        },
        updateConsumable: (state, action) => {
            const updatedConsumable = state.consumables.map(consumable => {
                if (consumable._id === action.payload._id) {
                    return { ...consumable, ...action.payload }
                }
                return consumable;
            })
            state.consumables = updatedConsumable;
        },
        deleteConsumable: (state, action) => {
            const deleteConsumable = state.consumables.filter(consumable => {
                return consumable._id !== action.payload._id
            })
            state.consumables = deleteConsumable
        },
        logoutC: (state) => {
            state.consumables = [];
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchAsyncConsumable.fulfilled, (state, action) => {
            /* console.log("Fetched Successfully!"); */
            return { consumables: action.payload };
        });
        builder.addCase(fetchAsyncConsumable.rejected, (state, action) => {
            /* console.log("Rejected!"); */
        });
    }
});

export const { addNewConsumable, updateConsumable, deleteConsumable, logoutC } = consumableSlice.actions;

export const getConsumables = (state) => state.consumable.consumables;

export default consumableSlice.reducer;