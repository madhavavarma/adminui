import { Box, Button, Collapse, IconButton, Switch, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from "@mui/material";
import React, { useEffect } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../helpers/GetIcons";
import { NavigateTo } from "../../services/Navigate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";


export const VariantList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

   
    var navigate = useNavigate();
    var dispatch = useDispatch();

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( "VARIANTS" ));
      });


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
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.VarinatsEdit(navigate, row.id)}>
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
      const rows = [
        createData(1, 'Size', true),
        createData(2, 'Color', true),
        createData(3, 'Weight', true)
      ];

    return <>
        <article className={clsContainer}>
            <section className={clsHeader}>
                <h6> Variants List</h6>
                <Button className="text-gray-100 font-bold tracking-wider" variant="contained" onClick={() => NavigateTo.VariantsCreate(navigate)}>
                  <span className="text-gray-100 font-bold tracking-wider">Add Variant</span>
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
                            <TableCell>Variant</TableCell>
                            <TableCell>Published</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {rows.map((row) => (
                            <Row key={row.name} row={row} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={10}
                        page={1}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>
        </article>
    </>
}