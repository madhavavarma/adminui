import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMainAlert, INotifications } from "./interfaces/INotifications";

const initialState: INotifications = {
    mainAlert: { message: "", type: ""},
    headerMessage: "Welcome!"
}

const setMainAlert = (state: INotifications, action: PayloadAction<IMainAlert>) => {
    state.mainAlert = action.payload;
    return state;
}

const setHeaderMessage = (state: INotifications, action: PayloadAction<string>) => {
    state.headerMessage = action.payload;
    return state;
}

const notificationsSlice = createSlice({
    name: "Notifications",
    initialState: initialState,
    reducers: {
        setMainAlert,
        setHeaderMessage
    }
});

export const NotificationsActions = notificationsSlice.actions;

export default notificationsSlice;