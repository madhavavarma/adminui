import { useEffect, useState } from "react";
import { ProductCreate } from "./Create";
import { useParams } from "react-router-dom";
import { IProduct } from "../../models/IProduct";

const productData: IProduct = {
    name: "Tomato",
    description: "Good For Health",
    id: 1,
    isPublished: true,
    price: 30,
    image: "https://tomato.img",
    discount: 0,
    tax: 0
}

export const ProductEdit = () => {

    const [product, setProduct] = useState<IProduct>();
    const { id } = useParams();

    useEffect(() => {
        if(id) {
            setProduct(productData)
        }
    }, [])

    return <>
        {product && <ProductCreate product={product} isEdit={true} /> }
    </>
}