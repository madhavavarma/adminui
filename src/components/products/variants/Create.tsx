import { Box, Button, Collapse, Divider, FormControl, FormControlLabel, InputLabel, MenuItem, Select, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../../store/Notifications";
import React from "react";
import { IVariant } from "../../../models/IVariant";

interface IProps {
    variant?: IVariant,
    isEdit?: boolean
  }

export const ProductVariantCreate = (props: IProps) => {

    var dispatch = useDispatch();

    const [variant] = useState<IVariant | null>(props.variant || null);
    const [isPublished, setIsPublished] = useState(variant?.isPublished || false);
    const [show, setShow] = useState(true);
    const [selectedVariant, setSelectedVariant] = useState<IVariant | null>(null);
    const [rows, setRows] = useState<any>();

    const variants: IVariant[] = [
        { id: 1, name: 'Size', isPublished: true, options: [
            { id: 11, name: 'Small', isPublished: true, variantId: 1 },
            { id: 12, name: 'Medium', isPublished: true, variantId: 1 },
            { id: 13, name: 'Large', isPublished: true, variantId: 1 }
        ]},
        { id: 2, name: 'Color', isPublished: true, options: [
            { id: 11, name: 'Red', isPublished: true, variantId: 2 },
            { id: 12, name: 'Green', isPublished: true, variantId: 2 },
            { id: 13, name: 'Blue', isPublished: true, variantId: 2 }
        ]}
    ];

    const handleVariantChange = (event: any) => {
        const variantId = event.target.value as number;
        const variant = variants.find(variant => variant.id === variantId) || null;
        setRows(variant?.options?.map(options => createData(options.id, options.name, false)));
        setSelectedVariant(variant);
    };

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT VARIANT" : "ADD VARIANT"));

        console.log(props.variant)

        if(props.variant) {
            setSelectedVariant(props?.variant)
        }

        setRows(props.variant?.options?.map(options => createData(options.id, options.name, options.isPublished)));


        setShow(true);
    }, []);

    useEffect(() => {}, [selectedVariant])


    function createData(
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
      
    function Row(props: { row: ReturnType<typeof createData> }) {
        const { row } = props;
        const [open] = React.useState(false);
      
        return (
          <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={row.published} />
             </TableCell>
             <TableCell >
                 <TextField id="price" required label="Amount" variant="outlined" size="small"  value={0} />         
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
                          <TableCell>Amount</TableCell>
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


    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <FormControl fullWidth variant="outlined" margin="normal" size="small">
                            <InputLabel>Variant</InputLabel>
                            <Select 
                                value={selectedVariant?.id || ''}
                                onChange={handleVariantChange}
                                label="Variant"
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
                                {variants.map((variant) => (
                                    <MenuItem key={variant.id} value={variant.id} disabled={!variant.isPublished}>
                                        {variant.name}
                                    </MenuItem>
                                ))}
                            </Select>
                    </FormControl>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
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
                            <TableCell>Price</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows?.map((row: any) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    {/* <TablePagination
                        className="mb-6"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows?.length || 0}
                        rowsPerPage={10}
                        page={1}
                        onPageChange={() => {}}
        /> */}
                    <Divider />
                </section>
                
                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {}}>Cancel</Button>
                    <Button variant="contained" className="" onClick={() => {}}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
        </article>}
    </>
}