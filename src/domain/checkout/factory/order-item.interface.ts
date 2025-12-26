export default interface OrderItemInterface {
    get id(): string;
    get name(): string;
    get price(): number;
    get productId(): string;
    get quantity(): number;
}