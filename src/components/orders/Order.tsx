import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime"
import { getMode } from "../../helpers/CommonFunctions";
import { OrderStateActions } from "../../store/Order";
import { getOrder } from "../../services/api";
import { IOrder } from "../../models/IOrder";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "../../store/interfaces/IState";

export const Order = () => {

    var params = useParams();
    var navigate = useNavigate();
    var dispatch = useDispatch();
    const [show, setShow] = useState(false);
    var state = useSelector((state: IState) => state.OrderState);

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
        { show && <div>"My Order" + {state?.order?.id}</div> }
    </Fragment>

}

