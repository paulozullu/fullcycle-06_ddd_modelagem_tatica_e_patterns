import OrderItem from './order_items';

export default class Order {
  private _id: string;
  private _customerId: string; // different aggregate
  private _items: OrderItem[] = []; // same   aggregate
  private _total: number;

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id;
    this._customerId = customerId;
    this._items = items;
    this._total = this.total();
    this.validate();
  }

  validate() {
    if (!this._id.length) {
        throw new Error("Id is required");
    }

    if (!this._customerId.length) {
        throw new Error("customerId is required");
    }

    if (!this._items.length) {
        throw new Error("Item quantity must be greater than 0");
    }
}

  total(): number {
    return this._items.reduce((acc, item) => acc + item.price, 0);
  }
}
