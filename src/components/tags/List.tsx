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


export const TagsList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

    var dispatch = useDispatch();

    const [editTag, setEditTag] = useState<number | null>(null);
    const [createTag, setCreateTag] = useState<boolean>(false);
    const [tags, setTags] = useState<ITag[]>();

    useEffect(() => {
      dispatch(NotificationsActions.setHeaderMessage( "TAGS" ));

      setTags([
        createData(1, 'Organic',  true),
        createData(2, 'Leafy',  true),
        createData(3, 'Vegetables',  true),
        createData(4, 'Fruits',  false),
        createData(5,'Healthy',  true),
      ])
    }, []);      


    function createData(
        id: number,
        name: string,
        isPublished: boolean,
      ) {
        return {
          id,
          name,
          isPublished,
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
                {row.name}
              </TableCell>
              <TableCell >
                <Switch defaultChecked={row.isPublished} />
             </TableCell>
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditTag(row.id)}>
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
      

    return <>
        <article className={clsContainer}>
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
                        {tags?.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={tags?.length || 0}
                        rowsPerPage={10}
                        page={1}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>

            <Drawer open={createTag} onClose={() => {setCreateTag(false)}}  className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Create Tag"}}>
                    <TagCreate />
                </Card>
            </Drawer>

            <Drawer open={editTag != null} onClose={() => {setEditTag(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Edit Tag"}}>
                    <TagEdit tag={tags?.find(tag => tag.id === editTag)}/>
                </Card>
            </Drawer>
        </article>
    </>
}