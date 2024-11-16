import { Autocomplete,  Button, Chip, Drawer, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { ICategory } from "../../models/ICategory";
import { ITag } from "../../models/ITag";
import React from "react";
import { GetIcon } from "../../helpers/GetIcons";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProductVariantCreate } from "./variants/Create";
import { getCategories, getProduct, getTags, getVariants } from "../../services/api";
import { IState } from "../../store/interfaces/IState";
import { ProductStateActions } from "../../store/Product";
import { IVariant } from "../../models/IVariant";

export const ProductCreate = () => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4 mt-8";
    const clsChild = "font-Play font-medium overflow-scroll";

    const dispatch = useDispatch();
    var navigate = useNavigate();
    var state = useSelector((state: IState) => state.ProductState);

    const [name, setName] = useState<string>();
    const [image, setImage] = useState<string>();
    const [description, setDescription] = useState<string>();
    const [isPublished, setIsPublished] = useState<boolean>();
    const [price, setPrice] = useState<number>();
    const [discount, setDiscount] = useState<number>();
    const [tax, setTax] = useState<number>();
    const [show, setShow] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<Number[]>([]);
    const [selectedSubcategory, setSelectedSubcategory] = useState<Number[]>([]);
    const [selectedMinicategory, setSelectedMinicategory] = useState<Number[]>([]);
    

    const [tags, setTags] = useState<ITag[]>([]);
    const [variants, setVariants] = useState<IVariant[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);
    var params = useParams();

    useEffect(() => {
        getTags().then(tags => {setTags(tags)});
        getVariants().then(variants => {setVariants(variants)});
        getCategories().then(categories => {setCategories(categories)});

        if(params.id) {
            getProduct().then(product => {
                dispatch(ProductStateActions.setProduct(product));
    
                setName(product.name);
                setImage(product.image);
                setDescription(product.description);
                setDiscount(product.discount);
                setTax(product.tax);
                setIsPublished(product.isPublished);
                setPrice(product.price);      
                setShow(true);      
            });

            
        } else {
            setShow(true); 
        }
    }, []);

    const viewVariant = (variantId: number, variantMode: string) => {
        dispatch(ProductStateActions.setVariant(variantId));
        dispatch(ProductStateActions.setVariantMode(variantMode));
        var productVaraint = state.product.productVariants?.find(variant => variant.variantId === variantId);
        if(productVaraint) {
            dispatch(ProductStateActions.setProductVariant(productVaraint));
        }
    }


    const create = () => {
        NavigateTo.Products(navigate);
    }

    const handleCategoryChange = (event: any) => {
        console.log(event.target.value)
        setSelectedCategory(event.target.value);
        setSelectedSubcategory([]); // Reset subcategory when category changes
        setSelectedMinicategory([]); 
    };

    const handleSubcategoryChange = (event: any) => {
        console.log(event.target.value)
        setSelectedSubcategory(event.target.value);
        setSelectedMinicategory([]); 
    };

    const handleMinicategoryChange = (event: any) => {
        console.log(event.target.value)
        setSelectedMinicategory(event.target.value);
    };

    const getCategoryName = (subCategoryId : number) =>  {
        return categories.find(x => x.subCategories?.find(subCat => subCat.id === subCategoryId))?.name;
    }

    const getSubCategoryName = (miniCategoryId : number) =>  {
        return categories.flatMap(x => x.subCategories).filter(x => !!x).find(x => x.subCategories?.find(subCat => subCat.id === miniCategoryId))?.name;
    }


    const [productTags, setProductTags] = useState<ITag[]>();


    const handleChange = (event: any, value: ITag[]) => {
        event = event;
        setProductTags(value);
    };
      
      function VariantRow(props: { variant: IVariant }) {
        const { variant } = props;
        const [open, setOpen] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => setOpen(!open)}
                >
                  {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                </IconButton>
              </TableCell>
              <TableCell component="th" scope="row">
                {variant.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={variant.isPublished} />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => viewVariant(variant.id, "V")}>
                        <IconButton aria-label="Example">
                            {GetIcon("visibility", "--btn-icon-color-view")} 
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => viewVariant(variant.id, "E")}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>                    
                </section>                
             </TableCell>

             
            </TableRow>
            <TableRow>
             
            </TableRow>
          </React.Fragment>
        );
      }
     

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
                <article className={clsContainer}>
                    <section className={clsChild}>
                        {/* <TableContainer component={Paper}> */}
                            <Table aria-label="collapsible table">
                                <TableHead>
                                <TableRow>
                                    <TableCell><IconButton
                        aria-label="expand row"
                        size="small"
                        >
                        {/* <KeyboardArrowDownIcon /> */}
                        </IconButton></TableCell>
                                    <TableCell>Variant</TableCell>
                                    <TableCell>Published</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {variants?.map((variant) => (
                                    <VariantRow key={variant.name} variant={variant} />
                                ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={variants?.length}
                                rowsPerPage={10}
                                page={0}
                                onPageChange={() => {}}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
                        {/* </TableContainer> */}
                    </section>

                    <Drawer open={['V', 'E'].includes(state.variantMode)}  className="w-full" anchor={"right"} PaperProps={{
                        sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                            <Card card= { {cardHeader: "Edit Variant"}}>
                                <ProductVariantCreate />
                            </Card>
                    </Drawer>
                </article>
                
            </Card>
            <Card card= { {cardHeader: "Categories"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                                labelId="multiple-select-label"
                                id="multiple-select"
                                multiple
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                renderValue={(selected) => categories.filter(x => selected?.includes(x.id))?.map(x => x.name).join(', ')} // to display selected items as a comma-separated list
                            >
                            
                            {categories.map((category) => (
                                <MenuItem key={category.id} value={category.id} disabled={!category.isPublished}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                        <InputLabel>Sub Category</InputLabel>
                        <Select
                                labelId="multiple-select-label"
                                id="multiple-select"
                                multiple
                                value={selectedSubcategory}
                                onChange={handleSubcategoryChange}
                                renderValue={(selected) => categories.flatMap(x => x.subCategories).filter(x => selected?.includes(x?.id || 0))?.map(x => getCategoryName(x?.id || 0) + " => " + x?.name).join(', ')} // to display selected items as a comma-separated list
                            >
                            
                            {categories.filter(x => selectedCategory.includes(x.id)).flatMap(x => x.subCategories).map((category) => (
                                <MenuItem key={category?.id} value={category?.id} disabled={!category?.isPublished}>
                                    {getCategoryName(category?.id || 0) + " => " + category?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                        <InputLabel>Mini Category</InputLabel>
                        <Select
                                labelId="multiple-select-label"
                                id="multiple-select"
                                multiple
                                value={selectedMinicategory}
                                onChange={handleMinicategoryChange}
                                renderValue={(selected) => categories
                                    .flatMap(x => x.subCategories)
                                    .flatMap(x => x?.subCategories)
                                    .filter(x => selected?.includes(x?.id || 0))?.map(x => getSubCategoryName(x?.id || 0) + " => " + x?.name)
                                    .join(', ')} // to display selected items as a comma-separated list
                            >
                            
                            {categories.filter(x => selectedCategory.includes(x.id)).flatMap(x => x.subCategories)
                            .flatMap(x => x?.subCategories).filter(x => !!x).map((category) => (
                                <MenuItem key={category?.id} value={category?.id} disabled={!category?.isPublished}>
                                    {getSubCategoryName(category?.id || 0) + " => " + category?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </section>
            </Card>
            <Card card= { {cardHeader: "Tags"}}>
            <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(tag) => tag.name}
                value={productTags}
                onChange={() => handleChange}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select Tags" placeholder="Choose Tags" />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip label={option.name} {...getTagProps({ index })} />
                    ))
                }
                />
            </Card>
            
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Products(navigate)}>Cancel</Button>
                    {state.mode === "C" && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {state.mode === "E" && <Button variant="contained" className="" onClick={() => create()}>Update</Button>}
                    {state.mode === "D" && <Button variant="contained" className="" onClick={() => {}}>Delete</Button>}
                    {state.mode === "V" && <Button variant="contained" className="" onClick={() => NavigateTo.Products(navigate)}>Ok</Button>}
                </section>
            </Card>
        </article>}
    </>
}