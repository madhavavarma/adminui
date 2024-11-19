import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProductState } from "./interfaces/IProductState";
import { IProduct, IProductVariant } from "../models/IProduct";
import { IVariant } from "../models/IVariant";

var initialState: IProductState = {
    product: { 
        name: "",
        isPublished: false,
        image: "",

        description: "",
        price: 0,
        discount: 0,
        tax: 0, 

        productVariants: [],
        productTags: []
    },

    mode: "",

    variantMode: "",
    updateVariant: null,
    variantId: null
}

const setMode =  (state: IProductState, action: PayloadAction<string>) => {
    state.mode = action.payload;
}

const resetState = (state: IProductState) => {
    state = initialState;
}

const setProduct = (state: IProductState, action: PayloadAction<IProduct>) => {
    state.product = action.payload;
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


const updateProductName = (state: IProductState, action: PayloadAction<string>) => {
    state.product.name = action.payload
}

// Update product image
const updateProductImage = (state: IProductState, action: PayloadAction<string>) => {
    state.product.image = action.payload;
  };
  
  // Update product description
  const updateProductDescription = (state: IProductState, action: PayloadAction<string>) => {
    state.product.description = action.payload;
  };
  
  // Update isPublished flag
  const updateProductIsPublished = (state: IProductState, action: PayloadAction<boolean>) => {
    state.product.isPublished = action.payload;
  };
  
  // Update product price
  const updateProductPrice = (state: IProductState, action: PayloadAction<number>) => {
    state.product.price = action.payload;
  };
  
  // Update product discount
  const updateProductDiscount = (state: IProductState, action: PayloadAction<number>) => {
    state.product.discount = action.payload;
  };
  
  // Update product tax
  const updateProductTax = (state: IProductState, action: PayloadAction<number>) => {
    state.product.tax = action.payload;
  };
  
  // Update product variants
  const updateProductVariants = (state: IProductState, action: PayloadAction<IProductVariant[]>) => {
    state.product.productVariants = action.payload;
  };
  
  // Update product categories
  const updateProductCategories = (state: IProductState, action: PayloadAction<number[]>) => {
    state.product.productCategories = action.payload;
  };
  
  // Update product subcategories
  const updateProductSubCategories = (state: IProductState, action: PayloadAction<number[]>) => {
    state.product.productSubCategories = action.payload;
  };
  
  // Update product mini categories
  const updateProductMiniCategories = (state: IProductState, action: PayloadAction<number[]>) => {
    state.product.productMiniCategories = action.payload;
  };
  
  // Update product tags
  const updateProductTags = (state: IProductState, action: PayloadAction<number[]>) => {
    state.product.productTags = action.payload;
  };


  // __________________________ Variants ++++++++++++++++++++++++++++

  const setVariantMode = (state: IProductState, action: PayloadAction<string>) => {
    state.variantMode = action.payload;
    
}

const setUpdateVariantId = (state: IProductState, action: PayloadAction<number>) => {
    state.variantId = action.payload;
}

const setUpdateVariant = (state: IProductState, action: PayloadAction<IVariant | null>) => {
    state.updateVariant = action.payload;
}

const setUpdateVariantIsPublished = (state: IProductState, action: PayloadAction<boolean>) => {
    if(!state.updateVariant) return;
    state.updateVariant.isPublished = action.payload;
}


const setUpdateVariantOptionIsPublished = (state: IProductState, action: PayloadAction<any>) => {
    if(!state.updateVariant) return;

    var updateOption = state.updateVariant.options.find(opt => opt.id === action.payload.optionId);

    if(!updateOption) return;

    updateOption.isPublished = action.payload.isPublished;
}

const setUpdateVariantOptionPrice = (state: IProductState, action: PayloadAction<any>) => {
    if(!state.updateVariant) return;

    var updateOption = state.updateVariant.options.find(opt => opt.id === action.payload.optionId);

    if(!updateOption) return;

    updateOption.price = action.payload.price;
}

const addProductVariant = (state: IProductState) => {

    if(!state.updateVariant) return;

    state.product.productVariants.push(mapIVariantToIProductVariant(state.updateVariant, state.product.id || 0));

}

const updateProductVariant = (state: IProductState) => {

    if(!state.updateVariant) return;

    var productVariant = mapIVariantToIProductVariant(state.updateVariant, state.product.id || 0);

    var variants = state.product.productVariants.filter(x => x.variantId !== productVariant.variantId);

    variants.push(productVariant);

    state.product.productVariants = variants;
    
}

const deleteProductVariant = (state: IProductState) => {

    if(!state.updateVariant) return;

    state.product.productVariants = state.product.productVariants.filter(pv => pv.variantId !== state.updateVariant?.id)
    
}

const updateProductVariantOption = (state: IProductState, action: PayloadAction<any>) => {

    // if(!state.updateVariant) {
    //     state.updateVariant = {productId: -1, variantId: -1, isPublished: false, productvariantoptions: []};
    // }

    // const productOption = state.updateVariant?.productvariantoptions.find(option => option.optionId == action.payload.optionId);

    // if(productOption) {
    //   productOption.price = action.payload.price;
    //   productOption.isPublished = action.payload.isPublished;
    // } else {
    //   state.updateVariant?.productvariantoptions.push({
    //     optionId: action.payload.optionId, 
    //     price: action.payload.price,  
    //     isPublished: action.payload.isPublished
    //     });
    // }
}

function mapIVariantToIProductVariant(variant: IVariant, productId: number): IProductVariant {
    // Map the IVariant to IProductVariant
    const productVariant: IProductVariant = {
        productId,
        variantId: variant.id ?? 0, // Use the variant's id if available, otherwise default to 0
        isPublished: variant.isPublished,
        productvariantoptions: variant.options.map(option => {
            return {
                optionId: option.id || 0,
                isPublished: option.isPublished,                
                price: option.price || 0
            };
        })
    };
    
    return productVariant;
}



const ProductSlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {
        setMode,
        setProduct,
        updateProduct,
        resetState,

        

        updateProductVariantPrice: updateProductVariantOption,
        updateProductVariant,
        addProductVariant,
        deleteProductVariant,


        updateProductName,
        updateProductImage,
        updateProductDescription,
        updateProductIsPublished,
        updateProductPrice,
        updateProductDiscount,
        updateProductTax,
        updateProductVariants,
        updateProductCategories,
        updateProductSubCategories,
        updateProductMiniCategories,
        updateProductTags,

        setVariantMode,
        setVariant: setUpdateVariantId,
        setUpdateVariant,
        setUpdateVariantIsPublished,
        setUpdateVariantOptionIsPublished,
        setUpdateVariantOptionPrice,
    }
});

export const ProductStateActions = ProductSlice.actions;

export default ProductSlice;