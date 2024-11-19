import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVariant } from "../models/IVariant";
import { IVariantState } from "./interfaces/IVariantState";
import { IOption } from "../models/IOption";


var initialState: IVariantState = {
    variant: {
        name: "",
        isPublished: false,
        options: [] 
    },
    mode: "",
    optionsMode: "",
    option: {
        name: "",
        isPublished: false,
        variantId: -1
    }
}

const setVariant = (state: IVariantState, action: PayloadAction<IVariant>) => {
    state.variant = action.payload;
}

const updateVariant = (state: IVariantState, action: PayloadAction<Partial<IVariant>>) => {
    state.variant.name = action.payload.name || "";
    state.variant.isPublished = action.payload.isPublished || false;
}

const setMode =  (state: IVariantState, action: PayloadAction<string>) => {
    state.variant = initialState.variant;
    state.option = initialState.option;
    state.mode = action.payload;
}

const setOptionsMode =  (state: IVariantState, action: PayloadAction<string>) => {
    state.optionsMode = action.payload;
}

const setEditOption =  (state: IVariantState, action: PayloadAction<IOption>) => {
    state.option = action.payload;
}

const setDefaultOption =  (state: IVariantState) => {
    state.option = {
        id: -1,
        name: "",
        isPublished: false,
        variantId: -1
    }
}

const addOption =  (state: IVariantState, action: PayloadAction<IOption>) => {
    var option = action.payload;
    option.variantId = state.variant.id;
    state.variant.options.push(option);
}

const updateOption =  (state: IVariantState, action: PayloadAction<IOption>) => {
    var option = state.variant.options.find(x => x.id == action.payload.id);

    if(option) {
        option.name = action.payload.name;
        option.isPublished = action.payload.isPublished;
        option.variantId = state.variant.id;
    }

}

const deleteOption =  (state: IVariantState, action: PayloadAction<IOption>) => {
    var option = action.payload;
    var options = state.variant.options.filter(x => x.id !== option.id);
    state.variant.options = options;
}


const VariantSlice = createSlice({
    name: "Variant",
    initialState: initialState,
    reducers: {
        setVariant,
        updateVariant,
        setMode,
        setOptionsMode,
        setEditOption,
        setDefaultOption,
        addOption,
        updateOption,
        deleteOption
    }
});


export const VariantStateActions = VariantSlice.actions;

export default VariantSlice;