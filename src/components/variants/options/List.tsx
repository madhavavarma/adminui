import {Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../../helpers/GetIcons";
import { Card } from "../../../basecomponents/Card";
import { IOption } from "../../../models/IOption";
import { OptionEdit } from "./Edit";
import { OptionView } from "./View";
import { OptionDelete } from "./Delete";

interface IProps {
  options: IOption[],
  isEdit: boolean
}


const OptionsList = (props: IProps) => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsChild = "font-Play font-medium overflow-scroll";

    const [editOption, setEditOption] = useState<number | null>(null);
    const [viewOption, setViewOption] = useState<number | null>(null);
    const [deleteOption, setDeleteOption] = useState<number | null>(null);
    const [options, setOptions] = useState<IOption[]>();

    useEffect(() => {
      console.log(props.options)
      setOptions(props.options);
    }, []);

    const cancel = () => {
      setEditOption(null);
      setViewOption(null);
      setDeleteOption(null);
    }

    const updateOption = (option: IOption) => {
      var updateOption = options?.find(opt => opt.id === option.id);

      if(updateOption) {
        updateOption.isPublished = option.isPublished;
        updateOption.name = option.name;

        setOptions(options);
      }
    }

    const delOption = (option: IOption) => {
      if(options) {
        var newOptions = options.filter(opt => opt.id != option.id);
        setOptions(newOptions);
      }
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
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setViewOption(option.id)}>
                        <IconButton aria-label="Example">
                          {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    {props.isEdit && <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditOption(option.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span> }
                    {props.isEdit && <span className="bg-btn-icon-color-dull rounded" onClick={() => setDeleteOption(option.id)}>
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
                          {options?.map((option) => (
                              <Row key={option.id} option={option} />
                          ))}
                        </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={options?.length || 0}
                    rowsPerPage={10}
                    page={0}
                    onPageChange={() => {}}
                />
            </section>

            <Drawer open={editOption != null} onClose={() => {setEditOption(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Edit Option"}}>
                    <OptionEdit option={options?.find(option => option.id === editOption)} cancel={cancel} updateOption={updateOption}/>
                </Card>
            </Drawer>
            <Drawer open={viewOption != null} onClose={() => {setViewOption(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "View Option"}}>
                    <OptionView option={options?.find(option => option.id === viewOption)} cancel={cancel}/>
                </Card>
            </Drawer>
            <Drawer open={deleteOption != null} onClose={() => {setDeleteOption(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Delete Option"}}>
                    <OptionDelete option={options?.find(option => option.id === deleteOption)} cancel={cancel} deleteOption={delOption}/>
                </Card>
            </Drawer>
        </article>
    </>
}

export default OptionsList;