import { IOption } from "../../models/IOption";
import { IVariant } from "../../models/IVariant";

export interface IVariantState {

    mode: string;
    variant: IVariant;

    
    optionsMode: string;
    option: IOption;
}