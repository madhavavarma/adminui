import { useEffect, useState } from "react";
import { OptionCreate } from "./Create";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption 
}

export const OptionEdit = (props: IProps) => {

    const [category, setCategory] = useState(props.option);

    useEffect(() => {
        console.log(category);
        if(category) {
            setCategory(props.option)
        }
    }, [])

    return <>
        {category && <OptionCreate option={category} isEdit={true} /> }
    </>
}