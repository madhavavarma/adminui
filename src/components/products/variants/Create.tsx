import { Button, Divider, FormControl, FormControlLabel, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField} from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { IVariant } from "../../../models/IVariant";
import { IState } from "../../../store/interfaces/IState";
import { getVariant } from "../../../services/api";
import { IOption } from "../../../models/IOption";
import { ProductStateActions } from "../../../store/Product";


export const ProductVariantCreate = () => {

    var dispatch = useDispatch();
    

    const state= useSelector((state: IState) => state.ProductState);

    const [show, setShow] = useState(true);
    const [variant, setVariant] = useState<IVariant>();
    const [isPublished, setIsPublished] = useState<boolean>(state.productVariant?.isPublished || false);


    useEffect(() => {
      if(state.variantId)
      getVariant(state.variantId).then(variant => {
        setVariant(variant);
        setShow(true);
      }
    );
    }, []);

    const cancel = () => {
      dispatch(ProductStateActions.setVariantMode(""));
    }

    const updateOption = (optionId: number, price: number, isPublished: boolean) => {
        dispatch(ProductStateActions.updateProductVariantPrice({optionId, price, isPublished}));
    }

    const updateOptionPrice = (optionId: number, price: number) => {
      var isPublished = state.productVariant?.options.find(x => x.optionId == optionId)?.isPublished;
      updateOption(optionId, price, isPublished || false);
    }

    const updateOptionIsPublished = (optionId: number, isPublished: boolean) => {
      var price = state.productVariant?.options.find(x => x.optionId == optionId)?.price;
      updateOption(optionId, price || 0, isPublished || false);
    }

    const updateProductVariant = () => {
      dispatch(ProductStateActions.updateProductVariant({isPublished}));
      dispatch(ProductStateActions.setVariantMode(""));
    }



    function Row(props: { variantOption: IOption }) {
        const { variantOption: row } = props;
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={state.productVariant?.options.find(x => x.optionId == row.id)?.isPublished} 
                 onChange={(e) => updateOptionIsPublished(row.id || 0, e.target.checked)}
                 disabled = {state.variantMode == "V"} 
                value={row.isPublished} /> 
             </TableCell>
             <TableCell >
                 <TextField id="price" required label="Amount" variant="outlined" size="small" value={row.price}
                  onBlur={(e) => updateOptionPrice(row.id || 0, +e.target.value)} 
                  disabled = {state.variantMode == "V"} 
                  defaultValue={state.productVariant?.options.find(x => x.optionId == row.id)?.price || 0} />         
             </TableCell>
            </TableRow>
          </React.Fragment>
        );
    }


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                    <TextField id="name" required label="Variant Name" disabled={true} variant="outlined" size="small" value={variant?.name} />
                    </FormControl>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch onChange={(e) => setIsPublished(e.target.checked)} defaultChecked = {isPublished} /> } disabled = {state.variantMode == "V"} />
                    </span>
                </section>

               
                <section>
                    <span className="text-text-header-color size-sm font-semibold">Options</span>
                    <Divider />

                    {/* <TableContainer component={Paper}> */}
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Option</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell onClick= {() => {console.log(state.productVariant)}}>Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {variant?.options?.map((row: any) => (
                            <Row key={row.name} variantOption={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="mb-6"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={variant?.options.length || 0}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
        />
                    <Divider />
                </section>
                
                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {cancel()}}>Cancel</Button>
                    {state.variantMode === "E" && <Button variant="contained" className="" onClick={() => updateProductVariant()}>Update</Button>}
                    {state.variantMode === "V" && <Button variant="contained" className="" onClick={() => cancel()}>Ok</Button>}
                </section>
        </article>}
    </>
}