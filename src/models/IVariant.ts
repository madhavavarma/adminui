import { IOption } from "./IOption";

export interface IVariant {
    id: number,
    name: string,   
    isPublished: boolean,
    options: IOption[]   
}