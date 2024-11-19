import { Box, Button, Collapse, Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../helpers/GetIcons";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { Card } from "../../basecomponents/Card";
import { TagEdit } from "./Edit";
import { ITag } from "../../models/ITag";
import { TagCreate } from "./Create";
import { getTags } from "../../services/api";


export const TagsList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

    var dispatch = useDispatch();

    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [pageNo, setPageNo] = useState(0);
    const [editTag, setEditTag] = useState<number | null>(null);
    const [viewTag, setViewTag] = useState<number | null>(null);
    const [deleteTag, setDeleteTag] = useState<number | null>(null);
    const [createTag, setCreateTag] = useState<boolean>(false);
    const [tags, setTags] = useState<ITag[]>();
    const [show, setShow] = useState(false);

    useEffect(() => {
      getTags().then((tags: ITag[]) => setTags(tags));   
      setShow(true);  
    }, []);   

    const close = () => {
      
      getTags().then((tags: ITag[]) => {
        setTags(tags);
        setDeleteTag(null);
        setEditTag(null);
        setViewTag(null);
        setCreateTag(false);
      });   
    }

    const handleChangePage = (event:any, newPage: any) => {
      setPageNo(newPage);
    };
  
    // Handle rows per page change
    const handleChangeRowsPerPage = (event: any) => {
      setRowsPerPage(parseInt(event.target.value, 10));
      setPageNo(0); // Reset to the first page when changing the rows per page
    };
    
    
      
    function Row(props: { row: ITag }) {
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
                {row.tagName}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={row.isPublished} disabled />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setViewTag(row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example" onClick={() => setEditTag(row.id)}>
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example" onClick={() => setDeleteTag(row.id)}>
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
                          <TableCell >Total price ($)</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {/* {row.history?.map((historyRow) => (
                          <TableRow key={historyRow.date}>
                            <TableCell component="th" scope="row">
                              {historyRow.date}
                            </TableCell>
                            <TableCell>{historyRow.customerId}</TableCell>
                            <TableCell >{historyRow.amount}</TableCell>
                            
                          </TableRow>
                        ))} */}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </React.Fragment>
        );
    }

    const currentTags = tags?.slice(pageNo * rowsPerPage, pageNo * rowsPerPage + rowsPerPage);
      

    return <>
        {show && <article className={clsContainer}>
            <section className={clsHeader}>
                <h6> Tags List</h6>
                <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => setCreateTag(true)}>
                    <span className="text-gray-100 font-bold tracking-wider">Add Tag</span>
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
                            <TableCell>Tag</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {currentTags?.map((row) => (
                            <Row key={row.tagName} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    {tags && tags.length && <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tags?.length || 0}
                        rowsPerPage={rowsPerPage}
                        page={pageNo}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
        />}
                {/* </TableContainer> */}
            </section>

            <Drawer open={createTag} onClose={() => {setCreateTag(false)}}  className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Create Tag"}}>
                    <TagCreate isCreate={true} close={close}/>
                </Card>
            </Drawer>
            <Drawer open={editTag != null} onClose={() => {setEditTag(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Edit Tag"}}>
                    <TagEdit tag={tags?.find(tag => tag.id === editTag)} isEdit={true} close={close}/>
                </Card>
            </Drawer>
            <Drawer open={viewTag != null} onClose={() => {setViewTag(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "View Tag"}}>
                    <TagEdit tag={tags?.find(tag => tag.id === viewTag)} isView={true} close={close}/>
                </Card>
            </Drawer>
            <Drawer open={deleteTag != null} onClose={() => {setDeleteTag(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Delete Tag"}}>
                    <TagEdit tag={tags?.find(tag => tag.id === deleteTag)} isDelete={true} close={close}/>
                </Card>
            </Drawer>
        </article> }
    </>
}