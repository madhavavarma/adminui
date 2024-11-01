import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductState } from "./interfaces/IProductState";
import { IProduct, IProductVariant } from "../models/IProduct";

var initialState: IProductState = {
    product: { id: -1,
        name: "",
        isPublished: false,
        image: "",

        description: "",
        price: 0,
        discount: 0,
        tax: 0, 

        productVariants: [],
        productTags: [],
        productCategories: []
    },

    mode: "",

    variantMode: "",
    productVariant: null,
    variantId: null
}

const setMode =  (state: IProductState, action: PayloadAction<string>) => {
    state.mode = action.payload;
}

const setProduct = (state: IProductState, action: PayloadAction<IProduct>) => {
    state.product = action.payload;
}

const setVariantMode = (state: IProductState, action: PayloadAction<string>) => {
    console.log(action.payload);
    state.variantMode = action.payload;
    
}

const setVariant = (state: IProductState, action: PayloadAction<number>) => {
    console.log(action.payload);
    state.variantId = action.payload;
}

const setProductVariant = (state: IProductState, action: PayloadAction<IProductVariant>) => {
    state.productVariant = action.payload;
}

const updateProduct = (state: IProductState, action: PayloadAction<Partial<IProduct>>) => {
    state.product.name = action.payload.name || "";
    state.product.isPublished = action.payload.isPublished || false;
    state.product.image = action.payload.image || "";
    state.product.description = action.payload.description || "";
    state.product.price = action.payload.price || 0;
    state.product.discount = action.payload.discount || 0;
    state.product.tax = action.payload.tax || 0;
    console.log(action.payload);
}



const ProductSlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {
        setMode,
        setProduct,
        updateProduct,

        setVariantMode,
        setVariant,
        setProductVariant
    }
});

export const ProductStateActions = ProductSlice.actions;

export default ProductSlice;