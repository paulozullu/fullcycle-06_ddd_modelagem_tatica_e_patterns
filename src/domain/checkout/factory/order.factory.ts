import Order from '../entity/order';
import OrderItem from '../entity/order_items';
import OrderItemInterface from './order-item.interface';
import OrderInterface from './order.interface';

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: OrderItemInterface[];
}

export default class OrderFactory {
  static create(props: OrderFactoryProps): OrderInterface {
    const items = props.items.map((item) => {
      return new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId
      );
    });

    return new Order(props.id, props.customerId, items);
  }
}
