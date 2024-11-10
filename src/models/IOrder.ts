export interface IOrder {
    id: number,
    total: number,
    paymentStatus: string,
    items: number,
    orderStatus: string,
    customer: string
}