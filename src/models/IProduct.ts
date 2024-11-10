import { ITag } from "./ITag";

export interface IProduct {
    id: number,
    name: string,
    image: string,
    description: string,

    isPublished: boolean,
    
    price: number,
    discount: number,
    tax: number, 

    productVariants: IProductVariant[],
    productCategories: IProductCategories[],
    productTags: ITag[]
}

export interface IProductVariant {
    productId: number,
    variantId: number,
    isPublished: boolean,
    options: IProductVariantOption[]
}

export interface IProductVariantOption {
    optionId: number,
    price: number,
    isPublished: boolean
}

export interface IProductCategories {
    productId: number,
    categoryId: number,
    subCategoryId: number,
    miniCategoryId: number
}

export interface IProductTag {
    productId: number;
    tagId: number;
}

