import axios from "axios";
import { ITag } from "../models/ITag";
import { IVariant } from "../models/IVariant";


export const isMock = true;

export const getTags = async () => {

    if(isMock) {
        return (await axios.get<ITag[]>('/adminui/json/tags.json')).data;
    }
    else {
        return (await axios.get<ITag[]>('/adminui/tags.json')).data;
    }   

}

export const getVariants = async () => {

    if(isMock) {
        return (await axios.get<IVariant[]>('/adminui/json/variants.json')).data;
    }
    else {
        return (await axios.get<IVariant[]>('/adminui/variants.json')).data;
    }   

}

export const getVariant = async (id: number) => {

    if(isMock) {
        return (await axios.get<IVariant>('/adminui/json/variant.json')).data;
    }
    else {
        return (await axios.get<IVariant>('/adminui/variant.json' + id)).data;
    }   

}