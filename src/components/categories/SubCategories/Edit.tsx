import { useEffect, useState } from "react";
import { ICategory } from "../../../models/ICategory";
import { SubCategoryCreate } from "./Create";

interface IProps {
    category?: ICategory 
}

export const SubCategoryEdit = (props: IProps) => {

    const [category, setCategory] = useState(props.category);

    useEffect(() => {
        console.log(category);
        if(category) {
            setCategory(props.category)
        }
    }, [])

    return <>
        {category && <SubCategoryCreate category={category} isEdit={true} /> }
    </>
}