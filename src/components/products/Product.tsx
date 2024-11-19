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
import { ProductVariant } from "./variants/ProductVariant";
import { createProduct, getCategories, getProduct, getTags, getVariants, updateProduct } from "../../services/api";
import { IState } from "../../store/interfaces/IState";
import { ProductStateActions } from "../../store/Product";
import { IVariant } from "../../models/IVariant";
import { getMode } from "../../helpers/CommonFunctions";
import { IProduct, IProductVariant } from "../../models/IProduct";

export const Product = () => {

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4 mt-8";
    const clsChild = "font-Play font-medium overflow-scroll";

    const dispatch = useDispatch();
    var navigate = useNavigate();
    var params = useParams();

      
    const [show, setShow] = useState(false);
    const [tags, setTags] = useState<ITag[]>([]);
    const [variants, setVariants] = useState<IVariant[]>([]);
    const [categories, setCategories] = useState<ICategory[]>([]);

    var state = useSelector((state: IState) => state.ProductState);  
    

    useEffect(() => {

        var mode = getMode(params?.mode || "");
        dispatch(ProductStateActions.setMode(mode));
        dispatch(ProductStateActions.resetState());
        
        getTags().then(tags => {setTags(tags)});
        getVariants().then(variants => {setVariants(variants)});
        getCategories().then(categories => {setCategories(categories)})
        
        if(params.id) {
            getProduct(+params.id || 0).then((prod: IProduct) => {
                dispatch(ProductStateActions.setProduct(prod));
                setShow(true); 
            });
        } else {
            setShow(true); 
        }
    }, []);

    const create = () => {  
        createProduct(state.product);
        NavigateTo.Products(navigate);
    }

    const updateP = () => {  
        updateProduct(state.product.id || 0, state.product);
        NavigateTo.Products(navigate);
    }

    const getCategoryName = (subCategoryId : number) =>  {
        return categories.find(x => x.subCategories?.find(subCat => subCat.id === subCategoryId))?.name;
    }

    const getSubCategoryName = (miniCategoryId : number) =>  {
        return categories.flatMap(x => x.subCategories).filter(x => !!x).find(x => x.subCategories?.find(subCat => subCat.id === miniCategoryId))?.name;
    }


    const setName = (name: string) => {
        dispatch(ProductStateActions.updateProductName(name));
    }

    const setImage = (image: string) => {
        dispatch(ProductStateActions.updateProductImage(image));
    }

    const setDescription = (description: string) => {
        dispatch(ProductStateActions.updateProductDescription(description));
    }

    const setIsPublished = (isPublished: boolean) => {
        dispatch(ProductStateActions.updateProductIsPublished(isPublished));
    }

    const setPrice = (price: number) => {
        dispatch(ProductStateActions.updateProductPrice(price));
    }

    const setDiscount = (discount: number) => {
        dispatch(ProductStateActions.updateProductDiscount(discount));
    }

    const setTax = (tax: number) => {
        dispatch(ProductStateActions.updateProductTax(tax));
    }

    const setProductCategories = (event: any) => {
        dispatch(ProductStateActions.updateProductCategories(event.target.value));
        dispatch(ProductStateActions.updateProductSubCategories([]));
        dispatch(ProductStateActions.updateProductMiniCategories([]));
    };

    const setProductSubCat = (event: any) => {
        dispatch(ProductStateActions.updateProductSubCategories(event.target.value));
        dispatch(ProductStateActions.updateProductMiniCategories([]));
    };

    const setProductMinCat = (event: any) => {
        dispatch(ProductStateActions.updateProductMiniCategories(event.target.value));
    };

    const setProductTags = (event: any, value: ITag[]) => {
        event = event;
        dispatch(ProductStateActions.updateProductTags(value.map(x => x.id)));
    };


    const createVariant = () => {
        viewVariant(null, "C");
    }

    const viewVariant = (variantId: number | null, variantMode: string) => {
        dispatch(ProductStateActions.setVariant(variantId || 0));
        dispatch(ProductStateActions.setVariantMode(variantMode));
    }
      
    function VariantRow(props: { variant?: IVariant }) {
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
                {variant?.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={state.product.productVariants.map(x => x.variantId).includes(variant?.id || 0)} />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => viewVariant(variant?.id || 0, "V")}>
                        <IconButton aria-label="Example">
                            {GetIcon("visibility", "--btn-icon-color-view")} 
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => viewVariant(variant?.id || 0, "E")}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>   
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => viewVariant(variant?.id || 0, "D")}>
                        <IconButton aria-label="Example">
                            {GetIcon("delete", "--btn-icon-color-delete")}
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

              {/* ************** PRODUCT INFO ______________________ */}
            <Card card= { {cardHeader: "Product Information"}}>
                <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    <TextField id="name" required label="Product Name" variant="outlined" size="small" value={state.product.name} onChange={(e: any) => setName(e.target.value)}/>
                    <TextField id="image" required label="Product Image (url)" variant="outlined" size="small" value={state.product.image} onChange={(e: any) => setImage(e.target.value)}/>
                    <TextField multiline id="description" label="Description" variant="outlined" size="small" value={state.product.description} onChange={(e: any) => setDescription(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={state.product.isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>
            </Card>

             {/* ************** PRICING AND VARIANTS______________________ */}
            <Card card= { {cardHeader: "Pricing"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <TextField id="price" required label="Price" variant="outlined" size="small" type="number" value={state.product.price} onChange={(e: any) => setPrice(e.target.value)}/>
                    <TextField id="discount" label="Discount" variant="outlined" size="small" type="number" value={state.product.discount} onChange={(e: any) => setDiscount(e.target.value)}/>
                    <TextField multiline id="tax" label="Tax" variant="outlined" size="small" type="number" value={state.product.tax} onChange={(e: any) => setTax(e.target.value)}/>
                </section>
                <article className={clsContainer}>
                    <section className={clsChild}>
                        <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => createVariant()}>
                            <span className="text-gray-100 font-bold tracking-wider">Add Variant</span>
                        </Button>
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
                                {state.product.productVariants?.map((prodVariant) => {
                                    var variant = variants.find(variant => variant.id === prodVariant.variantId);
                                    return <VariantRow key={variant?.name} variant={variant} />
                                })}
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

                    <Drawer open={['V', 'E', 'C', 'D'].includes(state.variantMode)}  className="w-full" anchor={"right"} PaperProps={{
                        sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                            <Card card= { {cardHeader: "Add/Edit Variant"}}>
                                <ProductVariant />
                            </Card>
                    </Drawer>
                </article>
                
            </Card>


             {/* ************** CATEGORIES ______________________ */}
            <Card card= { {cardHeader: "Categories"}}>
                <section className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                        <InputLabel>Category</InputLabel>
                        <Select
                                labelId="multiple-select-label"
                                id="multiple-select"
                                multiple
                                value={state.product.productCategories || []}
                                onChange={setProductCategories}
                                renderValue={(selected) => categories.filter(x => selected?.includes(x.id || 0))?.map(x => x.name).join(', ')} // to display selected items as a comma-separated list
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
                                value={state.product.productSubCategories || []}
                                onChange={setProductSubCat}
                                renderValue={(selected) => categories.flatMap(x => x.subCategories).filter(x => selected?.includes(x?.id || 0))?.map(x => getCategoryName(x?.id || 0) + " => " + x?.name).join(', ')} // to display selected items as a comma-separated list
                            >
                            
                            {categories.filter(x => state.product.productCategories?.includes(x.id || 0)).flatMap(x => x.subCategories).map((category) => (
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
                                value={state.product.productMiniCategories || []}
                                onChange={setProductMinCat}
                                renderValue={(selected) => categories
                                    .flatMap(x => x.subCategories)
                                    .flatMap(x => x?.subCategories)
                                    .filter(x => selected?.includes(x?.id || 0))?.map(x => getSubCategoryName(x?.id || 0) + " => " + x?.name)
                                    .join(', ')} // to display selected items as a comma-separated list
                            >
                            
                            {categories.filter(x => state.product.productCategories?.includes(x.id || 0)).flatMap(x => x.subCategories)
                            .flatMap(x => x?.subCategories).filter(x => !!x).map((category) => (
                                <MenuItem key={category?.id} value={category?.id} disabled={!category?.isPublished}>
                                    {getSubCategoryName(category?.id || 0) + " => " + category?.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </section>
            </Card>

            {/* ************** TAGS ______________________ */}
            <Card card= { {cardHeader: "Tags"}}>
            <Autocomplete
                multiple
                options={tags}
                getOptionLabel={(tag) => tag.tagName}
                value={tags.filter(tag => state.product.productTags?.includes(tag.id))}
                onChange={setProductTags}
                renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Select Tags" placeholder="Choose Tags" />
                )}
                renderTags={(value, getTagProps) =>
                    value.map((option, index) => (
                    <Chip label={option.tagName} {...getTagProps({ index })} />
                    ))
                }
                />
            </Card>
            
            <Card card= { {cardHeader: ""}}>
                <section className="grid grid-cols-2 gap-8 rounded-lg">
                    <Button variant="outlined" onClick={() => NavigateTo.Products(navigate)}>Cancel</Button>
                    {state.mode === "C" && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {state.mode === "E" && <Button variant="contained" className="" onClick={() => updateP()}>Update</Button>}
                    {state.mode === "D" && <Button variant="contained" className="" onClick={() => {}}>Delete</Button>}
                    {state.mode === "V" && <Button variant="contained" className="" onClick={() => NavigateTo.Products(navigate)}>Ok</Button>}
                </section>
            </Card>
        </article>}
    </>
}