import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFlags } from "./interfaces/IFlags";

const initialState: IFlags = {
    showHeader: true,
    showFooter: true,
    showNav: true,
    darkMode: false
}

const setHeader = (state: IFlags, action: PayloadAction<boolean>) => {
    state.showHeader = action.payload;
    return state;
}

const setFooter = (state: IFlags, action: PayloadAction<boolean>) => {
    state.showFooter = action.payload;
    return state;
}

const setNav = (state: IFlags, action: PayloadAction<boolean>) => {
    state.showNav = action.payload;
    return state;
}

const setDarkMode = (state: IFlags, action: PayloadAction<boolean>) => {
    state.darkMode = action.payload;
    return state;
}

const flagsSlice = createSlice({
    name: "Notifications",
    initialState: initialState,
    reducers: {
        setHeader,
        setFooter,
        setNav,
        setDarkMode
    }
});

export const FlagsActions = flagsSlice.actions;

export default flagsSlice;