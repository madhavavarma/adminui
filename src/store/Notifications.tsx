import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainAlert, INotifications } from "./interfaces/INotifications";

const initialState: INotifications = {
    mainAlert: { message: "", type: ""}
}

const setMainAlert = (state: INotifications, action: PayloadAction<IMainAlert>) => {
    state.mainAlert = action.payload;
    return state;
}

const notificationsSlice = createSlice({
    name: "Notifications",
    initialState: initialState,
    reducers: {
        setMainAlert
    }
});

export const NotificationsActions = notificationsSlice.actions;

export default notificationsSlice;