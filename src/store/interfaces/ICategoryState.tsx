import { ICategory } from "../../models/ICategory";

export interface ICategoryState {

    mode: string;
    category: ICategory;

    
    subCategoryMode: string;
    subCategory: ICategory;
}