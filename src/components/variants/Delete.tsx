import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { VariantCreate } from "./Create";
import { IVariant } from "../../models/IVariant";
import { getVariant } from "../../services/api";

export const VariantDelete = () => {

    const [variant, setVariant] = useState<IVariant>();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            getVariant(+id).then(variant => setVariant(variant))
        }
    }, [])

    return <>
        {variant && <VariantCreate Variant={variant} isDelete={true} /> }
    </>
}