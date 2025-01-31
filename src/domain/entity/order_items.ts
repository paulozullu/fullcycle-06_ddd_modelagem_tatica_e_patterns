export default class OrderItem {
  private _id: string;
  private _productId: string; // different aggregate
  private _name: string;
  private _price: number;
  private _quantity: number;

  constructor(
    id: string,
    name: string,
    price: number,
    quantity: number,
    productId: string
  ) {
    this._id = id;
    this._name = name;
    this._price = price;
    this._quantity = quantity;
    this._productId = productId;
    this.validate();
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get name(): string {
    return this._name;
  }

  get quantity(): number {
    return this._quantity;
  }

  changeName(name: string): void {
    this._name = name;
  }

  changePrice(price: number): void {
    this._price = price;
  }

  changeQuantity(quantity: number): void {
    this._quantity = quantity;
  }

  validate() {
    if (!this._id.length) {
      throw new Error('Id is required');
    }

    if (!this._name.length) {
      throw new Error('Name is required');
    }

    if (this._price < 0) {
      throw new Error('Price must be greater then zero');
    }

    if (this._quantity <= 0) {
      throw new Error('Item quantity must be greater than 0');
    }

    if (!this._productId.length) {
      throw new Error('Product Id is required');
    }
  }

  get price(): number {
    return this._price;
  }

  orderItemTotal(): number {
    return this._price * this._quantity;
  }
}
