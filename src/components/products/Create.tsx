import { Button, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { IProduct } from "../../models/IProduct";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { ICategory } from "../../models/ICategory";

interface IProps {
    product?: IProduct,
    isEdit?: boolean
  }

  const categories: ICategory[] = [
    { id: 1, name: 'Electronics', isPublished: true, subCategories: [
        { id: 11, name: 'Phones', isPublished: true, parentCategory: 1, subCategories: [
            {id: 101, name: "One Plus", isPublished: true, parentCategory: 11}
        ] },
        { id: 12, name: 'Laptops', isPublished: true, parentCategory: 1, subCategories: [
            {id: 101, name: "Lenovo", isPublished: true, parentCategory: 12}
        ]  },
        { id: 13, name: 'Cameras', isPublished: true , parentCategory: 1, subCategories: [
            {id: 101, name: "Sony", isPublished: true, parentCategory: 13}
        ] },
    ]},
    { id: 2, name: 'Fashion', isPublished: true, subCategories: [
        { id: 21, name: 'Clothing', isPublished: true, parentCategory: 2, subCategories: [
            {id: 102, name: "Shirts", isPublished: true, parentCategory: 21}
        ]  },
        { id: 22, name: 'Shoes', isPublished: true, parentCategory: 2, subCategories: [
            {id: 102, name: "Casuals", isPublished: true, parentCategory: 22}
        ]  },
        { id: 23, name: 'Accessories', isPublished: true, parentCategory: 2, subCategories: [
            {id: 102, name: "Stand", isPublished: true, parentCategory: 23}
        ]  },
    ]}
];


export const ProductCreate = (props: IProps) => {

    const dispatch = useDispatch();
    var navigate = useNavigate();

    const [product, setProduct] = useState<IProduct>();
    const [name, setName] = useState(product?.name);
    const [image, setImage] = useState(product?.image);
    const [description, setDescription] = useState(product?.description);
    const [isPublished, setIsPublished] = useState(product?.isPublished || false);
    const [price, setPrice] = useState(product?.price);
    const [discount, setDiscount] = useState(product?.discount);
    const [tax, setTax] = useState(product?.tax);
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(null);
    const [selectedSubcategory, setSelectedSubcategory] = useState<ICategory | null>(null);
    const [selectedMinicategory, setSelectedMinicategory] = useState<ICategory | null>(null);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT PRODUCT" : "ADD PRODUCT"));

        if(props.product) {
            setProduct(props.product);
            setName(props.product.name);
            setImage(props.product.image);
            setDescription(props.product.description);
            setDiscount(props.product.discount);
            setTax(props.product.tax);
            setIsPublished(props.product.isPublished);
            setPrice(props.product.price);            
        }

        setShow(true);
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

        NavigateTo.Products(navigate);
    }

    const handleCategoryChange = (event: any) => {
        const categoryId = event.target.value as number;
        const category = categories.find(cat => cat.id === categoryId) || null;
        setSelectedCategory(category);
        setSelectedSubcategory(null); // Reset subcategory when category changes
    };

    const handleSubcategoryChange = (event: any) => {
        const subcategoryId = event.target.value as number;
        const subcategory = selectedCategory?.subCategories?.find((sub: ICategory) => sub.id === subcategoryId) || null;
        setSelectedSubcategory(subcategory);
        setSelectedMinicategory(null);
    };

    const handleMinicategoryChange = (event: any) => {
        const minicategoryId = event.target.value as number;
        const miniCategory = selectedSubcategory?.subCategories?.find((sub: ICategory) => sub.id === minicategoryId) || null;
        setSelectedMinicategory(miniCategory);
    };

    return <>
        {show && <article>
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
            <Card card= { {cardHeader: "Categories"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                        <InputLabel>Category</InputLabel>
                        <Select 
                            value={selectedCategory?.id || ''}
                            onChange={handleCategoryChange}
                            label="Category"
                            MenuProps={{
                                PaperProps: {
                                    style: {
                                        maxHeight: 200, // Set a max height for the dropdown
                                    },
                                },
                            }}
                            style={{ display: 'flex', alignItems: 'center' }} 
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id} disabled={!category.isPublished}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedCategory}  size="small">
                        <InputLabel>Subcategory</InputLabel>
                        <Select
                            value={selectedSubcategory?.id || ''}
                            onChange={handleSubcategoryChange}
                            label="Subcategory"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {selectedCategory?.subCategories?.map((subcategory) => (
                                <MenuItem key={subcategory.id} value={subcategory.id} disabled={!subcategory.isPublished}>
                                    {subcategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal" disabled={!selectedSubcategory}  size="small">
                        <InputLabel>MiniCategory</InputLabel>
                        <Select
                            value={selectedMinicategory?.id || ''}
                            onChange={handleMinicategoryChange}
                            label="Minicategory"
                        >
                            <MenuItem value="">
                                <em>None</em>
                            </MenuItem>
                            {selectedSubcategory?.subCategories?.map((minicategory) => (
                                <MenuItem key={minicategory.id} value={minicategory.id} disabled={!minicategory.isPublished}>
                                    {minicategory.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </section>
            </Card>
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Products(navigate)}>Cancel</Button>
                    <Button variant="contained" className="" onClick={() => create()}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
            </Card>
        </article>}
    </>
}