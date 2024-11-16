import { IOrder } from "../../models/IOrder";


export interface IOrderState {

    mode: string;
    order: IOrder | null;
    
}