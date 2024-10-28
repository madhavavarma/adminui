import { useEffect, useState } from "react";
import { OptionCreate } from "./Create";
import { IOption } from "../../../models/IOption";

interface IProps {
    option?: IOption,
    cancel: () => void,
    deleteOption: (option: IOption) => void,
}

export const OptionDelete = (props: IProps) => {

    const [option, setOption] = useState(props.option);

    useEffect(() => {
        if(option) {
            setOption(props.option)
        }
    }, [])

    return <>
        {option && <OptionCreate option={option} isDelete={true} cancel={props.cancel} deleteOption={props.deleteOption} /> }
    </>
}