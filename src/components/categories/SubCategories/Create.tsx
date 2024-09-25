import { Box, Button, Collapse, Divider, FormControlLabel, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, TextField, Typography } from "@mui/material"
import { ICategory } from "../../../models/ICategory";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../../store/Notifications";
import React from "react";
import { GetIcon } from "../../../helpers/GetIcons";

interface IProps {
    category?: ICategory,
    isEdit?: boolean
  }

export const SubCategoryCreate = (props: IProps) => {

    var dispatch = useDispatch();

    const [editMiniCategory, setEditMiniCategory] = useState<number | null>(null);

    const [Category, setCategory] = useState<ICategory | null>(props.category || null);
    const [name, setName] = useState(Category?.name);
    const [isPublished, setIsPublished] = useState(Category?.isPublished || false);
    const [show, setShow] = useState(true);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( props.isEdit ? "EDIT CATEGORY" : "ADD CATEGORY"));

        console.log(props.category)

        if(props.category) {
            setCategory(props.category);
            setName(props.category.name);
            setIsPublished(props.category.isPublished);
        }

        setShow(true);
    }, []);


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
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditMiniCategory(row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("dashboard", "")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example">
                            {GetIcon("dashboard", "")}
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

    const rows = props.category?.subCategories?.map(cat => createData(cat.id, cat.name, cat.isPublished))

    return <>
        {show && <article>
                <section className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-4 mb-8">
                    <TextField id="name" required label="Category Name" variant="outlined" size="small" value={name} onChange={(e: any) => setName(e.target.value)}/>
                    <span className="">
                        <FormControlLabel label= "Is Published" control= {
                        <Switch checked={isPublished} onChange={(e: any) => setIsPublished(e.target.checked)}/> } />
                    </span>
                </section>

               
                <section>
                    <span className="text-text-header-color size-sm font-semibold">Mini Categories</span>
                    <Divider />
                    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-1 mt-6">
                        <TextField id="name" required label="Mini" variant="outlined" size="small"  value={editMiniCategory} />
                        <Button variant="outlined" onClick={() => {}}>Add New</Button>
                    </section>

                    {/* <TableContainer component={Paper}> */}
                    <Table aria-label="collapsible table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Cagetory</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows?.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        className="mb-6"
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows?.length || 0}
                        rowsPerPage={10}
                        page={1}
                        onPageChange={() => {}}
        />
                    <Divider />
                </section>
                
                <section className="grid grid-cols-2 gap-2 rounded-lg mt-8">
                    <Button variant="outlined" onClick={() => {}}>Cancel</Button>
                    <Button variant="contained" className="" onClick={() => {}}>{props.isEdit ? "Update" : "Create" }</Button>
                </section>
        </article>}
    </>
}