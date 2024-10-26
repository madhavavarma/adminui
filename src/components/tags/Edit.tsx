import { useEffect, useState } from "react";
import { ITag } from "../../models/ITag";
import { TagCreate } from "./Create";

interface IProps {
    tag?: ITag 
    isEdit?: boolean,
    isDelete?: boolean,
    isView?: boolean,
    close: () => void
}

export const TagEdit = (props: IProps) => {

    const [tag, setTag] = useState(props.tag);

    useEffect(() => {
        console.log(tag);
        if(tag) {
            setTag(props.tag)
        }
    }, [])

    return <>
        {tag && <TagCreate tag={tag} isEdit={props.isEdit} isView={props.isView} isDelete={props.isDelete} close={props.close} /> }
    </>
}