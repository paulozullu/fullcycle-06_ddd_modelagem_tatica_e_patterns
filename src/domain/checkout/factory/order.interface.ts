import OrderItemInterface from "./order-item.interface";

export default interface OrderInterface {
    get id(): string;
    get customerId(): string;
    get items(): OrderItemInterface[];
    get total(): () => number;
}