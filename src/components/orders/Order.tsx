import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"
import { getMode } from "../../helpers/CommonFunctions";
import { OrderStateActions } from "../../store/Order";
import { getOrder } from "../../services/api";
import { IOrder } from "../../models/IOrder";
import { useDispatch } from "react-redux";
import { Box, Button, Card, CardContent, CardHeader, Chip, Container, Grid, Paper, Typography } from "@mui/material";
import { OrderProgress } from "./OrderProgress";
import { OrderTimeline } from "./OrderTimeline";
import { ArrowLeftRight, Package2, RefreshCw } from "lucide-react";
import { OrderSummary } from "./OrderSummary";
import { PaymentInfo } from "./PaymentInfo";
import { CustomerDetails } from "./CustomerDetails";
import { ProductTable } from "./ProductTable";

export const Order = () => {

    var params = useParams();
    // var navigate = useNavigate();
    var dispatch = useDispatch();
    const [show, setShow] = useState(false);
    // var state = useSelector((state: IState) => state.OrderState);

    useEffect(() => {
        var mode = getMode(params?.mode || "");
        dispatch(OrderStateActions.setMode(mode));

        if(params.id) {
            getOrder(+params.id).then((order: IOrder) => {
                dispatch(OrderStateActions.setOrder(order));
                setShow(true);
            })
        } else {
            setShow(true);
        }

    }, []);

    return <Fragment>
        { show && 
        
        <Box className="min-h-screen bg-gray-50 py-8">
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} lg={9} md={9}>
            <Paper className="mb-6 p-6">
              <Box className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <Box>
                  <Box className="flex items-center gap-2 mb-1">
                    <Typography variant="h6" className="font-medium">
                      #0758267/90
                    </Typography>
                    <Chip label="Paid" size="small" className="bg-green-100 text-green-800" />
                    <Chip label="In Progress" size="small" className="bg-yellow-100 text-yellow-800" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Order / Order Details / #0758267/90 - April 23, 2024 at 6:23 pm
                  </Typography>
                </Box>
                <Box className="flex gap-2">
                  <Button variant="outlined" startIcon={<ArrowLeftRight />}>
                    Refund
                  </Button>
                  <Button variant="outlined" startIcon={<RefreshCw />}>
                    Return
                  </Button>
                  <Button variant="contained" startIcon={<Package2 />}>
                    Edit Order
                  </Button>
                </Box>
              </Box>

              <Typography variant="h6" className="mb-4">
                Progress
              </Typography>
              <OrderProgress />
            </Paper>

            <Card className="mb-6">
              <CardHeader title="Products" />
              <CardContent>
                <ProductTable />
              </CardContent>
            </Card>

            <Card>
              <CardHeader title="Order Timeline" />
              <CardContent>
                <OrderTimeline />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} lg={3} md={3}>
            <OrderSummary />
            <PaymentInfo />
            <CustomerDetails />
          </Grid>
        </Grid>
      </Container>
    </Box>
        }
    </Fragment>

}

