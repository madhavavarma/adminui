import { useEffect, useState } from "react";
import { OptionCreate } from "./Create";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption,
    updateOption: (option: IOption) => void
    cancel: () => void  
}

export const OptionEdit = (props: IProps) => {

    const [option, setOption] = useState(props.option);

    useEffect(() => {
        if(option) {
            setOption(props.option)
        }
    }, [])

    return <>
        {option && <OptionCreate option={option} isEdit={true} cancel={props.cancel} updateOption={props.updateOption} /> }
    </>
}