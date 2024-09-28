import { useEffect, useState } from "react";
import { ITag } from "../../models/ITag";
import { TagCreate } from "./Create";

interface IProps {
    tag?: ITag 
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
        {tag && <TagCreate tag={tag} isEdit={true} /> }
    </>
}