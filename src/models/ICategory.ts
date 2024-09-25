export interface ICategory {
    id: number,
    name: string,
    image?: string,
    isPublished: boolean,
    parentCategory?: null | number,
    subCategories?: ICategory[] 
}