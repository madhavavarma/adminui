import { useEffect, useState } from "react";
import { IVariant } from "../../../models/IVariant";
import { ProductVariantCreate } from "./Create";

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


export const ProductVariantEdit = () => {

    const [variant, setVariant] = useState<IVariant>();

    useEffect(() => {
            setVariant(variantData)
    }, [])

    return <>
        {variant && <ProductVariantCreate variant={variant} isEdit={true} /> }
    </>
}