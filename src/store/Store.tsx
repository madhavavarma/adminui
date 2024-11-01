import { configureStore } from "@reduxjs/toolkit";
import notificationsSlice from "./Notifications";
import flagsSlice from "./Flags";
import VariantSlice from "./Variant";
import CategorySlice from "./Category";
import ProductSlice from "./Product";


export const store = configureStore({
    reducer: {
        Notifications: notificationsSlice.reducer,
        Flags: flagsSlice.reducer,
        VariantState: VariantSlice.reducer,
        CategoryState: CategorySlice.reducer,
        ProductState: ProductSlice.reducer
    }
})