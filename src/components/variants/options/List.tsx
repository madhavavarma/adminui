import {Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../../helpers/GetIcons";
import { Card } from "../../../basecomponents/Card";
import { IOption } from "../../../models/IOption";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../../store/interfaces/IState";
import { VariantStateActions } from "../../../store/Variant";
import { OptionCreate } from "./Create";


const OptionsList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsChild = "font-Play font-medium overflow-scroll";
    
    const dispatch = useDispatch();
    const state = useSelector((state: IState) => state.VariantState);

    const setOptionMode = (mode: string, editOption: IOption) => {
      dispatch(VariantStateActions.setOptionsMode(mode));
      dispatch(VariantStateActions.setEditOption(editOption));
    }
      

    function Row(prop: { option: IOption} ) {
        const { option } = prop;
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
                {option.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={option.isPublished} disabled={true}/>
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setOptionMode("V", option)}>
                        <IconButton aria-label="Example">
                          {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    {state.mode === "E" && <span className="bg-btn-icon-color-dull rounded" onClick={() => setOptionMode("E", option)}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span> }
                    {state.mode === "E"  && <span className="bg-btn-icon-color-dull rounded" onClick={() =>setOptionMode("D", option)}>
                        <IconButton aria-label="Example">
                          {GetIcon("delete", "--btn-icon-color-delete")}
                        </IconButton>
                    </span>}
                </section>                
             </TableCell>
             
            </TableRow>
           
          </React.Fragment>
        );
    }

    return <>
        <article className={clsContainer}>
            <section className={clsChild}>
               <Table aria-label="collapsible table">
                  <TableHead>
                      <TableRow>
                          <TableCell>
                            <IconButton aria-label="expand row" size="small">
                            <KeyboardArrowDownIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>Option</TableCell>
                          <TableCell>Published</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                  </TableHead>
                        <TableBody>
                          {state.variant.options.map((option) => (
                              <Row key={option.id} option={option} />
                          ))}
                        </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={state.variant.options.length || 0}
                    rowsPerPage={10}
                    page={0}
                    onPageChange={() => {}}
                />
            </section>

            <Drawer open={['E', 'D', 'V'].includes(state.optionsMode)} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Edit Option"}}>
                    <OptionCreate />
                </Card>
            </Drawer>
            
        </article>
    </>
}

export default OptionsList;