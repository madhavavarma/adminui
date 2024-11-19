import { Button, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField} from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import { IVariant } from "../../../models/IVariant";
import { IState } from "../../../store/interfaces/IState";
import { deleteVariant, getVariant, getVariants } from "../../../services/api";
import { IOption } from "../../../models/IOption";
import { ProductStateActions } from "../../../store/Product";
import { Satellite } from "lucide-react";


export const ProductVariant = () => {

    var dispatch = useDispatch();
    const state= useSelector((state: IState) => state.ProductState);
    

    const [show, setShow] = useState(false);
    const [variants, setVariants] = useState<IVariant[]>([]);  
    
    
    const getVariant = () => {
      if(state.variantId)
      return state.product.productVariants.find(x => x.variantId === state.variantId);
    }
    

    useEffect(() => {
      getVariants().then((vars: IVariant[]) => {
        setVariants(vars);  
        
        if(state.variantId) {
          setUpdateVariant(vars, state.variantId);
        } else {
          dispatch(ProductStateActions.setUpdateVariant(null))
        }

        setShow(true);
    })}, []); 

    const setUpdateVariant = (vars: IVariant[], variantId: number) => {

      var updateVariant = vars.find(v => v.id === variantId);

      if(!updateVariant) return;

      var productVariant = getVariant();

          if(updateVariant) {
            updateVariant.isPublished = productVariant?.isPublished || false;

            updateVariant?.options.forEach(uvo => {
              var pvo = productVariant?.productvariantoptions.find(pvo => pvo.optionId === uvo.id);
              uvo.isPublished = pvo?.isPublished || false;
              uvo.price = pvo?.price || 0;
            })
          }

      dispatch(ProductStateActions.setUpdateVariant(updateVariant))
    }



    const handleVariantChange = (event: any, val: any) => { 
        setUpdateVariant(variants, event.target.value);
    }

    const setIsPublished = (isPublished: boolean) => {
      dispatch(ProductStateActions.setUpdateVariantIsPublished(isPublished));
    }

    const cancel = () => {
      dispatch(ProductStateActions.setVariantMode(""));
    }
    
    const create = () => {
        dispatch(ProductStateActions.addProductVariant());
        dispatch(ProductStateActions.setVariantMode(""));
    }

    const deleteV = () => {
      dispatch(ProductStateActions.deleteProductVariant());
      dispatch(ProductStateActions.setVariantMode(""));
    }

    const updateProductVariant = () => {
      dispatch(ProductStateActions.updateProductVariant());
      dispatch(ProductStateActions.setVariantMode(""));
    }

    const updateOptionIsPublished = (optionId: number, isPublished: boolean) => {
      dispatch(ProductStateActions.setUpdateVariantOptionIsPublished({optionId, isPublished}));
    }

    const updateOptionPrice = (optionId: number, price: number) => {
      dispatch(ProductStateActions.setUpdateVariantOptionPrice({optionId, price}));
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
                <Switch defaultChecked={row.isPublished} 
                 onChange={(e) => updateOptionIsPublished(row.id || 0, e.target.checked)}
                 disabled = {state.variantMode == "V"} 
                /> 
             </TableCell>
             <TableCell >
                 <TextField id="price" required label="Amount" variant="outlined" size="small" 
                  onChange={(e) => updateOptionPrice(row.id || 0, +e.target.value)} 
                  disabled = {state.variantMode == "V"} 
                  defaultValue={row.price}
                   />         
             </TableCell>
            </TableRow>
          </React.Fragment>
        );
    }


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                    <InputLabel>Variant</InputLabel>
                        <Select
                                labelId="multiple-select-label"
                                id="multiple-select"
                                value={getVariant()?.variantId}
                                onChange={handleVariantChange}
                                disabled={!!state.variantId}
                            >
                            
                            {variants.map(x => <MenuItem key={x.id} value={x.id} disabled={!x.isPublished} selected={x.id === getVariant()?.variantId}>
                                    {x.name} 
                                </MenuItem>)
                                
                            }
                        </Select>
                    </FormControl>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch onChange={(e) => setIsPublished(e.target.checked)} defaultChecked = {state.updateVariant?.isPublished} /> } disabled = {state.variantMode == "V"} />
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
                            <TableCell onClick= {() => {console.log(state.updateVariant)}}>Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {state.updateVariant?.options?.map((row: any) => (
                            <Row key={row.name} variantOption={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="mb-6"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={state.updateVariant?.options?.length || 0}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
        />
                    <Divider />
                </section>
                
                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {cancel()}}>Cancel</Button>
                    {state.variantMode === "C" && <Button variant="contained" className="" onClick={() => create()}>Create</Button>}
                    {state.variantMode === "D" && <Button variant="contained" className="" onClick={() => deleteV()}>Delete</Button>}
                    {state.variantMode === "E" && <Button variant="contained" className="" onClick={() => updateProductVariant()}>Update</Button>}
                    {state.variantMode === "V" && <Button variant="contained" className="" onClick={() => cancel()}>Ok</Button>}
                </section>
        </article>}
    </>
}