import { Box, Button, Collapse, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../helpers/GetIcons";
import { NavigateTo } from "../../services/Navigate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { IProduct } from "../../models/IProduct";
import { getProducts } from "../../services/api";


export const ProductList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

    var navigate = useNavigate();
    var dispatch = useDispatch();
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
      dispatch(NotificationsActions.setHeaderMessage( "PRODUCTS" ));
       getProducts().then((products: IProduct[]) => setProducts(products))
    }, []);      

      function Row(props: { product: IProduct }) {
        const { product: product } = props;
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
                {product.name}
              </TableCell>
              <TableCell >{product.price}</TableCell>
              <TableCell >
                <Switch defaultChecked={product.isPublished} />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.ProductsView(navigate, product.id)}>
                        <IconButton aria-label="Example">
                          {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.ProductsEdit(navigate, product.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.ProductsDelete(navigate, product.id)}>
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
                    
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
      }
  

    return <>
        <article className={clsContainer}>
            <section className={clsHeader}>
                <h6> Products List</h6>
                <Button variant="contained" onClick={() => NavigateTo.ProductsCreate(navigate)}>
                  <span className="text-gray-100 font-bold tracking-wider">Add Product</span>
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
                  <KeyboardArrowDownIcon />
                </IconButton></TableCell>
                            <TableCell>Product</TableCell>
                            <TableCell>Price</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {products.map((product) => (
                            <Row key={product.name} product={product} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={products.length}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>
        </article>
    </>
}