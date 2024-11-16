import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrderState } from "./interfaces/IOrderState";
import { IOrder } from "../models/IOrder";

var initialState: IOrderState = {
    order: null,
    mode: ""
}


const setOrder = (state: IOrderState, action: PayloadAction<IOrder>) => {
    state.order = action.payload;
}

const setMode =  (state: IOrderState, action: PayloadAction<string>) => {
    state.mode = action.payload;
}

const OrderSlice = createSlice({
    name: "Order",
    initialState: initialState,
    reducers: {
        setOrder,  
        setMode      
    }
});

export const OrderStateActions = OrderSlice.actions;

export default OrderSlice;