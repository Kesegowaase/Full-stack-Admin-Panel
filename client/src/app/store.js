import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import titleReducer from "./features/titleSlice";
import consumableReducer from "./features/consumableSlice";
import storeReducer from "./features/storeSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        title: titleReducer,
        consumable: consumableReducer,
        store: storeReducer,
    },
});