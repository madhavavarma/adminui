import { Box,  Collapse, Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../../helpers/GetIcons";
import { Card } from "../../../basecomponents/Card";
import { ICategory } from "../../../models/ICategory";
import { SubCategoryEdit } from "./Edit";


const SubCategoryList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsChild = "font-Play font-medium overflow-scroll";

    const [editSubCategory, setEditSubCategory] = useState<number | null>(null);
    const [subCategories, setSubCategories] = useState<ICategory[]>();

    useEffect(() => {

      var subCategories: ICategory[] = [
        {id: 11, name: "Vegetables", isPublished: true, parentCategory: 1, subCategories: 
          [
            {id: 21, name: "Leafy", isPublished:true, parentCategory: 11},
            {id: 22, name: "Root", isPublished:true, parentCategory: 11}
          ]
        },
        {id: 12, name: "Fruits", isPublished: true, parentCategory: 1, subCategories: 
        [
          {id: 23, name: "Leafy", isPublished:true, parentCategory: 12},
          {id: 24, name: "Root", isPublished:true, parentCategory: 12}
        ]},
        {id: 13, name: "Dairy", isPublished: true, parentCategory: 1, subCategories: 
          [
            {id: 25, name: "Eggs", isPublished:true, parentCategory: 13},
            {id: 26, name: "Milk", isPublished:true, parentCategory: 13}
          ]}
      ]

      setSubCategories(subCategories);
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
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditSubCategory(row.id)}>
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

    const rows = subCategories?.map(cat => createData(cat.id, cat.name, cat.isPublished))

    return <>
        <article className={clsContainer}>
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
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows?.length || 0}
                        rowsPerPage={10}
                        page={1}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>

            <Drawer open={editSubCategory != null} onClose={() => {setEditSubCategory(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Add Sub Category"}}>
                    
                    <SubCategoryEdit category={subCategories?.find(cat => cat.id === editSubCategory)}/>
                </Card>
            </Drawer>
        </article>
    </>
}

export default SubCategoryList;