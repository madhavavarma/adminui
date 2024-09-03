import { Button, FormControlLabel, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { IProduct } from "../../models/IProduct";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";


export const ProductCreate = () => {

    const dispatch = useDispatch();

    const [product] = useState<IProduct>();

    const [name, setName] = useState(product?.name);
    const [image, setImage] = useState(product?.image);
    const [description, setDescription] = useState(product?.description);

    const [isPublished, setIsPublished] = useState(product?.isPublished || false);

    const [price, setPrice] = useState(product?.price);
    const [discount, setDiscount] = useState(product?.discount);
    const [tax, setTax] = useState(product?.tax);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage("CREATE PRODUCT"));
    }, []);

    const create = () => {

        var product = {
            name,
            description,
            image,
            isPublished,
            price,
            discount,
            tax
        }

        console.log(product);
    }


    return <>
        <article>
            <MainAlert message="Fields marked with (*) are mandatory" />
            <Card card= { {cardHeader: "Product Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Product Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <TextField id="image" required label="Product Image (url)" variant="outlined" size="small" value={image} onChange={(e: any) => setImage(e.target.value)}/>
                    <TextField multiline id="description" label="Description" variant="outlined" size="small" value={description} onChange={(e: any) => setDescription(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>
            </Card>
            <Card card= { {cardHeader: "Pricing"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <TextField id="price" required label="Price" variant="outlined" size="small" type="number" value={price} onChange={(e: any) => setPrice(e.target.value)}/>
                    <TextField id="discount" label="Discount" variant="outlined" size="small" type="number" value={discount} onChange={(e: any) => setDiscount(e.target.value)}/>
                    <TextField multiline id="tax" label="Tax" variant="outlined" size="small" type="number" value={tax} onChange={(e: any) => setTax(e.target.value)}/>
                </section>
            </Card>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" className="" onClick={() => create()}>Create</Button>
                </section>
            </Card>
        </article>
    </>
}