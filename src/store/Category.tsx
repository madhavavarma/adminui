import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "../models/ICategory";
import { ICategoryState } from "./interfaces/ICategoryState";


var initialState: ICategoryState = {
    category: { id: -1,
    name: "",
    isPublished: false,
    image: "",
    parentCategory: -1,
    subCategories: [
    ] },

    mode: "",

    subCategory: { id: -1,
        name: "",
        isPublished: false,
        image: "",
        parentCategory: -1,
        subCategories: [
        ] },

    subCategoryMode: ""
}


const setCategory = (state: ICategoryState, action: PayloadAction<ICategory>) => {
    state.category = action.payload;
}

const updateCategory = (state: ICategoryState, action: PayloadAction<Partial<ICategory>>) => {
    state.category.name = action.payload.name || "";
    state.category.isPublished = action.payload.isPublished || false;
    state.category.image = action.payload.image;
    console.log(action.payload);
}

const setMode =  (state: ICategoryState, action: PayloadAction<string>) => {
    state.mode = action.payload;
}


const setSubCategoryMode =  (state: ICategoryState, action: PayloadAction<string>) => {
    state.subCategoryMode = action.payload;
}

const setEditSubCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    state.subCategory = action.payload;
}

const setDefaultSubCategory =  (state: ICategoryState) => {
    state.subCategory = initialState.subCategory;
}

const addSubCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = action.payload;
    subCategory.parentCategory = state.category.id;
    subCategory.subCategories = []
    console.log(subCategory)

    if(state.category.subCategories) {
        state.category.subCategories.push(subCategory);
    }
    
}

const updateSubCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = state.category.subCategories?.find(x => x.id == action.payload.id);

    if(subCategory) {
        subCategory.name = action.payload.name;
        subCategory.isPublished = action.payload.isPublished;
        subCategory.image = action.payload.image;
        subCategory.parentCategory = state.category.id;
        subCategory.subCategories = state.subCategory.subCategories;
    }

}

const deleteSubCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = action.payload;
    var subCategories = state.category.subCategories?.filter(x => x.id !== subCategory.id);
    state.category.subCategories = subCategories;
}

const addMiniCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = state.subCategory;
    var miniCategory = action.payload;
    miniCategory.parentCategory = state.subCategory.id;

    if(subCategory?.subCategories)
    subCategory.subCategories.push(miniCategory);
}

const updateMiniCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = state.subCategory;
    var miniCategory = subCategory?.subCategories?.find(x => x.id == action.payload.id);

    if(miniCategory) {
        miniCategory.name = action.payload.name;
        miniCategory.isPublished = action.payload.isPublished;
        miniCategory.parentCategory = state.subCategory.id;
    }

}

const deleteMiniCategory =  (state: ICategoryState, action: PayloadAction<ICategory>) => {
    var subCategory = state.subCategory;
    var miniCategory = action.payload;
    var miniCategories = subCategory?.subCategories?.filter(x => x.id !== miniCategory.id);

    if(subCategory)
    subCategory.subCategories = miniCategories;
}

const CategorySlice = createSlice({
    name: "Category",
    initialState: initialState,
    reducers: {
        setCategory,
        updateCategory,
        setMode,
        setSubCategoryMode,
        setEditSubCategory,
        setDefaultSubCategory,
        addSubCategory,
        updateSubCategory,
        deleteSubCategory,
        addMiniCategory,
        updateMiniCategory,
        deleteMiniCategory
    }
});

export const CategoryStateActions = CategorySlice.actions;

export default CategorySlice;
