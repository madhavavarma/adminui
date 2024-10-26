import axios from "axios";
import { ITag } from "../models/ITag";


export const isMock = true;

export const getTags = async () => {

    if(isMock) {
        return (await axios.get<ITag[]>('/adminui/json/tags.json')).data;
    }
    else {
        return (await axios.get<ITag[]>('/adminui/tags.json')).data;
    }   

}