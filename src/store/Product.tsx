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
    state.variantMode = action.payload;
    
}

const setVariant = (state: IProductState, action: PayloadAction<number>) => {
    state.variantId = action.payload;
}

const setProductVariant = (state: IProductState, action: PayloadAction<IProductVariant>) => {
    state.productVariant = action.payload;
}

const updateProductVariant = (state: IProductState, action: PayloadAction<any>) => {
    var productVariant = state.product.productVariants.find(pv => pv.variantId === state.productVariant?.variantId);

    if(productVariant) {
        state.product.productVariants = state.product.productVariants.filter(pv => pv.variantId != productVariant?.variantId);
    } 

    if(!state.productVariant) {
        state.productVariant = {productId: -1, variantId: -1, isPublished: false, options: []};
    }

    
    state.productVariant.isPublished = action.payload.isPublished;
    state.product.productVariants.push(state.productVariant);
    
}

const updateProductVariantOption = (state: IProductState, action: PayloadAction<any>) => {

    if(!state.productVariant) {
        state.productVariant = {productId: -1, variantId: -1, isPublished: false, options: []};
    }

    const productOption = state.productVariant?.options.find(option => option.optionId == action.payload.optionId);

    if(productOption) {
      productOption.price = action.payload.price;
      productOption.isPublished = action.payload.isPublished;
    } else {
      state.productVariant?.options.push({
        optionId: action.payload.optionId, 
        price: action.payload.price,  
        isPublished: action.payload.isPublished
        });
    }
}



const updateProduct = (state: IProductState, action: PayloadAction<Partial<IProduct>>) => {
    state.product.name = action.payload.name || "";
    state.product.isPublished = action.payload.isPublished || false;
    state.product.image = action.payload.image || "";
    state.product.description = action.payload.description || "";
    state.product.price = action.payload.price || 0;
    state.product.discount = action.payload.discount || 0;
    state.product.tax = action.payload.tax || 0;
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
        setProductVariant,

        updateProductVariantPrice: updateProductVariantOption,
        updateProductVariant
    }
});

export const ProductStateActions = ProductSlice.actions;

export default ProductSlice;