import axios from "axios";
import { ITag } from "../models/ITag";
import { IVariant } from "../models/IVariant";
import { IProduct } from "../models/IProduct";
import { IOrder } from "../models/IOrder";


export const isMock = true;

export const getProducts = async () => {

    if(isMock) {
        return (await axios.get<IProduct[]>('/adminui/json/products.json')).data;
    }
    else {
        return (await axios.get<IProduct[]>('/adminui/products.json')).data;
    }   

}

export const getProduct = async () => {

    if(isMock) {
        return (await axios.get<IProduct>('/adminui/json/product.json')).data;
    }
    else {
        return (await axios.get<IProduct>('/adminui/product.json')).data;
    }   

}

export const getCategories = async () => {

    if(isMock) {
        return (await axios.get<IVariant[]>('/adminui/json/categories.json')).data;
    }
    else {
        return (await axios.get<IVariant[]>('/adminui/categories.json')).data;
    }   

}

export const getCategory = async (id: number) => {

    if(isMock) {
        return (await axios.get<IVariant>('/adminui/json/category.json')).data;
    }
    else {
        return (await axios.get<IVariant>('/adminui/category.json' + id)).data;
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

export const getTags = async () => {

    if(isMock) {
        return (await axios.get<ITag[]>('/adminui/json/tags.json')).data;
    }
    else {
        return (await axios.get<ITag[]>('/adminui/tags.json')).data;
    }   

}

export const getOrders = async () => {

    if(isMock) {
        return (await axios.get<IOrder[]>('/adminui/json/orders.json')).data;
    }
    else {
        return (await axios.get<IOrder[]>('/adminui/orders.json')).data;
    }   

}

export const getOrder = async (id: number) => {

    if(isMock) {
        return (await axios.get<IOrder>('/adminui/json/order.json')).data;
    }
    else {
        return (await axios.get<IOrder>('/adminui/order.json' + id)).data;
    }   

}