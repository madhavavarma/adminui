import { useEffect, useState } from "react";
import { OptionCreate } from "./Create";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption,
    cancel: () => void  
}

export const OptionView = (props: IProps) => {

    const [option, setOption] = useState(props.option);

    useEffect(() => {
        if(option) {
            setOption(props.option)
        }
    }, [])

    return <>
        {option && <OptionCreate option={option} isView={true} cancel={props.cancel} /> }
    </>
}