import { ICategoryState } from "./ICategoryState";
import { IFlags } from "./IFlags";
import { INotifications } from "./INotifications";
import { IOrderState } from "./IOrderState";
import { IProductState } from "./IProductState";
import { IVariantState } from "./IVariantState";

export interface IState {
    Notifications: INotifications,
    Flags: IFlags,
    VariantState: IVariantState,
    CategoryState: ICategoryState,
    ProductState: IProductState,
    OrderState: IOrderState
}