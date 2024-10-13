import { Box,  Collapse, Drawer, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../../helpers/GetIcons";
import { Card } from "../../../basecomponents/Card";
import { IOption } from "../../../models/IOption";
import { OptionEdit } from "./Edit";


const OptionsList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsChild = "font-Play font-medium overflow-scroll";

    const [editOption, setEditOption] = useState<number | null>(null);
    const [options, setOptions] = useState<IOption[]>();

    useEffect(() => {

      var options: IOption[] = [
        {id: 21, name: "Small", isPublished:true, variantId: 11},
            {id: 22, name: "Medium", isPublished:true, variantId: 11}
      ]

      setOptions(options);
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
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => setEditOption(row.id)}>
                        <IconButton aria-label="Example">
                          {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded">
                        <IconButton aria-label="Example">
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

    const rows = options?.map(option => createData(option.id, option.name, option.isPublished))

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
                            <TableCell>Option</TableCell>
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

            <Drawer open={editOption != null} onClose={() => {setEditOption(null)}} className="w-full" anchor={"right"} PaperProps={{
            sx: {backgroundColor: "rgb(249, 247, 247)", width: "400px"} }}>
                <Card card= { {cardHeader: "Add Sub Category"}}>
                    <OptionEdit option={options?.find(option => option.id === editOption)}/>
                </Card>
            </Drawer>
        </article>
    </>
}

export default OptionsList;