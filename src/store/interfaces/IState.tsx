import { ICategoryState } from "./ICategoryState";
import { IFlags } from "./IFlags";
import { INotifications } from "./INotifications";
import { IVariantState } from "./IVariantState";

export interface IState {
    Notifications: INotifications,
    Flags: IFlags,
    VariantState: IVariantState,
    CategoryState: ICategoryState
}