import { IProduct } from "./IProduct";

export interface IOrder {
    id: number,
    total: number,
    paymentStatus: string,
    items: number,
    orderStatus: string,
    customer: ICustomerDetails,

    orderDate: string,
    shippingDate: string,

    products: IProduct[]
    orderSummary: IOrderSummary,
    paymentInformation: IPaymentInformation,

    orderTimeline: IOrderTimeline
    
}

export interface IOrderSummary {
    subTotal: number,
    discount: number,
    deliveryCharge: number,
    tax: number,
    totalAmount: number
}

export interface IPaymentInformation {
    paymentType: string,
    transactionId: string
}

export interface ICustomerDetails {
    name: string,
    email: string,
    phone: string,
    shippingAddress: IAddress,
    billingAddress: IAddress
}

export interface IAddress {
    houseNo: string,
    addressLine: string,
    landmark: string,
    state: string,
    pincode: string
}

export interface IOrderTimeline {

}