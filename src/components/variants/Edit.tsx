import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VariantCreate } from "./Create";
import { IVariant } from "../../models/IVariant";

const variantData : IVariant = {
    name: "Size",
    id: 1,
    isPublished: true,
    options : [
        {name: "Small", id: 1, variantId: 1, isPublished: true},
        {name: "Medium", id: 2, variantId: 2, isPublished: true},
        {name: "Large", id: 2, variantId: 2, isPublished: true}
    ]
}


export const VariantEdit = () => {

    const [variant, setVariant] = useState<IVariant>();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            setVariant(variantData)
        }
    }, [])

    return <>
        {variant && <VariantCreate Variant={variant} isEdit={true} /> }
    </>
}