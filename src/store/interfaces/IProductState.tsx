import { IProduct, IProductVariant } from "../../models/IProduct";

export interface IProductState {
    mode: string;
    product: IProduct;

    variantMode: string;
    productVariant: IProductVariant | null;
    variantId: number | null;
}