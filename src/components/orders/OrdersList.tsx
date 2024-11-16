import {  IconButton, Table, TableBody, TableCell, TableHead, TablePagination, TableRow } from "@mui/material";
import React, { useEffect, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { GetIcon } from "../../helpers/GetIcons";
import { NavigateTo } from "../../services/Navigate";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { NotificationsActions } from "../../store/Notifications";
import { getOrders } from "../../services/api";
import { IOrder } from "../../models/IOrder";


export const OrdersList = () => {
    const clsContainer = "bg-white shadow-card-shadow  border-card-bordercol rounded-lg divide-y mb-4";
    const clsHeader = "px-4 py-4 text-text-header-color size-sm font-semibold flex justify-between items-center";
    const clsChild = "font-Play font-medium overflow-scroll";

   
    var navigate = useNavigate();
    var dispatch = useDispatch();
    const [orders, setOrders] = useState<IOrder[]>([]);

    useEffect(() => {
        dispatch(NotificationsActions.setHeaderMessage( "ORDERS" ));

        getOrders().then((orders: IOrder[]) => setOrders(orders))
      }, []);

      function Row(props: { order: IOrder }) {
        const { order: row } = props;
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
                {row.id}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.total}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.orderStatus}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.items}
              </TableCell>
              <TableCell component="th" scope="row">
                {row.paymentStatus}
              </TableCell>
             
             <TableCell >
                <section className="flex items-center gap-2">
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.OrdersView(navigate, row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("visibility", "--btn-icon-color-view")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.OrdersEdit(navigate, row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("edit", "--btn-icon-color-edit")}
                        </IconButton>
                    </span>
                    <span className="bg-btn-icon-color-dull rounded" onClick={() => NavigateTo.OrdersView(navigate, row.id)}>
                        <IconButton aria-label="Example">
                            {GetIcon("delete", "--btn-icon-color-delete")}
                        </IconButton>
                    </span>
                </section>                
             </TableCell>             
            </TableRow>
            
          </React.Fragment>
        );
      }
      
    return <>
        <article className={clsContainer}>
            <section className={clsHeader}>
                <h6> Orders List</h6>
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
                            <TableCell>Order Id</TableCell>
                            <TableCell>total</TableCell>
                            <TableCell>Order Status</TableCell>
                            <TableCell>Items</TableCell>
                            <TableCell>Payment Status</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {orders.map((order: IOrder) => (
                            <Row key={order.id} order={order} />
                        ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={orders.length}
                        rowsPerPage={10}
                        page={0}
                        onPageChange={() => {}}
                        // onRowsPerPageChange={handleChangeRowsPerPage}
        />
                {/* </TableContainer> */}
            </section>
        </article>
    </>
}