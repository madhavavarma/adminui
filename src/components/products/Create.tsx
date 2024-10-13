import { Autocomplete, Box, Button, Chip, Collapse, Drawer, FormControl, FormControlLabel, IconButton, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import { Card } from "../../basecomponents/Card"
import { useEffect, useState } from "react";
import { IProduct } from "../../models/IProduct";
import { MainAlert } from "../../basecomponents/MainAlert";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { useNavigate } from "react-router-dom";
import { NavigateTo } from "../../services/Navigate";
import { ICategory } from "../../models/ICategory";
import { ITag } from "../../models/ITag";
import React from "react";
import { GetIcon } from "../../helpers/GetIcons";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ProductVariantCreate } from "./variants/Create";
import { ProductVariantEdit } from "./variants/Edit";

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

    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4 mt-8";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

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
    
    const [createVariant, setCreateVariant] = useState<boolean>(false);
    const [editVariant, setEditVariant] = useState<number | null>(null);

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


    const [productTags, setProductTags] = useState<ITag[]>();

    const tags: ITag[]= [
      { id: 1, name: 'Option 1', isPublished: true },
      { id: 2, name: 'Option 2', isPublished: true },
      { id: 3, name: 'Option 3', isPublished: true },
      { id: 4, name: 'Option 4', isPublished: true },
      { id: 5, name: 'Option 5', isPublished: true }
    ];

    const handleChange = (event: any, value: ITag[]) => {
        event = event;
        setProductTags(value);
    };

    function createVariantData(
        id: number,
        name: string,
        published: boolean,
      ) {
        return {
          id,
          name,
          published,
          history: [
            {
              date: '2020-01-05',
              customerId: '11091700',
              amount: 3,
            },
            {
              date: '2020-01-02',
              customerId: 'Anonymous',
              amount: 1,
            },
          ],
        };
      }
      
      function VariantRow(props: { row: ReturnType<typeof createVariantData> }) {
        const { row } = props;
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
                {row.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={row.published} />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditVariant(row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example">
                            {GetIcon("delete", "--btn-icon-color-delete")}
                        </IconButton>
                    </span>
                </section>                
             </TableCell>

             
            </TableRow>
            <TableRow>
              <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <Box sx={{ margin: 1 }}>
                    <Typography variant="h6" gutterBottom component="div">
                      History
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Date</TableCell>
                          <TableCell>Customer</TableCell>
                          <TableCell >Amount</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.history.map((historyRow) => (
                          <TableRow key={historyRow.date}>
                            <TableCell component="th" scope="row">
                              {historyRow.date}
                            </TableCell>
                            <TableCell>{historyRow.customerId}</TableCell>
                            <TableCell >{historyRow.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
      const variantRows = [
        createVariantData(1, 'Size', true),
        createVariantData(2, 'Color', true),
        createVariantData(3, 'Weight', true)
      ]; 
   

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
                    <section className={clsHeader}>
                        <h6> Variants List</h6>
                        <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => setCreateVariant(true)}>
                        <span className="text-gray-100 font-bold tracking-wider">Add Variant</span>
                        </Button>
                    </section>
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
                                {variantRows.map((row) => (
                                    <VariantRow key={row.name} row={row} />
                                ))}
                                </TableBody>
                            </Table>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25]}
                                component="div"
                                count={variantRows.length}
                                rowsPerPage={10}
                                page={1}
                                onPageChange={() => {}}
                                // onRowsPerPageChange={handleChangeRowsPerPage}
                />
                        {/* </TableContainer> */}
                    </section>

                    <Drawer open={createVariant} onClose={() => {setCreateVariant(false)}}  className="w-full" anchor={"right"} PaperProps={{
                        sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                            <Card card= { {cardHeader: "Add Variant"}}>
                                <ProductVariantCreate />
                            </Card>
                        </Drawer>

                        <Drawer open={!!editVariant} onClose={() => {setEditVariant(null)}}   className="w-full" anchor={"right"} PaperProps={{
                        sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                            <Card card= { {cardHeader: "Edit Variant"}}>
                                <ProductVariantEdit />
                            </Card>
                        </Drawer>
                </article>
                
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
                    <Button variant="contained" className="" onClick={() => create()}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
            </Card>
        </article>}
    </>
}