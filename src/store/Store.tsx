import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./Notifications";
import flagsSlice from "./Flags";


export const store = configureStore({
    reducer: {
        Notifications: notificationsSlice.reducer,
        Flags: flagsSlice.reducer
    }
})