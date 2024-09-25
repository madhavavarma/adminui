import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ICategory } from "../../models/ICategory";
import { CategoryCreate } from "./Create";

const categoryData : ICategory = {
    name: "Vegetables",
    id: 1,
    isPublished: true,
    image: "",
    subCategories : [
        {name: "Leafy", id: 1, isPublished: true},
        {name: "Root", id: 2, isPublished: true}
    ]
}


export const CategoryEdit = () => {

    const [category, setCategory] = useState<ICategory>();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            setCategory(categoryData)
        }
    }, [])

    return <>
        {category && <CategoryCreate Category={category} isEdit={true} /> }
    </>
}