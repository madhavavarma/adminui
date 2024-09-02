import { Button, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"


export const ProductCreate = () => {

    const label = { inputProps: { 'aria-label': 'Is Published' } };

    return <>
        <article>
            <Card card= { {cardHeader: "Product Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" label="Product Name" variant="outlined" size="small"/>
                    <TextField id="image" label="Product Image (url)" variant="outlined" size="small"/>
                    <TextField multiline id="description" label="Description" variant="outlined" size="small"/>
                    <span className="">
                        <Switch {...label} sx={{}} defaultChecked />
                        <label>Published</label>
                    </span>
                </section>
            </Card>
            <Card card= { {cardHeader: "Pricing"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <TextField id="price" label="Price" variant="outlined" size="small"/>
                    <TextField id="discount" label="Discount" variant="outlined" size="small"/>
                    <TextField multiline id="tax" label="Tax" variant="outlined" size="small"/>
                </section>
            </Card>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined">Cancel</Button>
                    <Button variant="contained" className="">Create</Button>
                </section>
            </Card>
        </article>
    </>
}