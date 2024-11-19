import { IProduct } from "../../models/IProduct";
import { IVariant } from "../../models/IVariant";

export interface IProductState {
    mode: string;
    product: IProduct;

    variantMode: string;
    updateVariant: IVariant | null;
    variantId: number | null;
}