import OrderItem from "./order_items";

export default class Order {
    _id: string;
    _customerId: string; // different aggregate
    _items: OrderItem[] = []; // same aggregate

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
    }
}