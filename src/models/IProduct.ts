export interface IProduct {
    id: number,
    name: string,
    image: string,
    description: string,

    isPublished: boolean,
    
    price: number,
    discount: number,
    tax: number
}