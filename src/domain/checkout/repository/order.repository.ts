import Order from '../entity/order';
import OrderItem from '../entity/order_items';
import OrderRepositoryInterface from './order.repository.interface';
import OrderItemModel from '../../../infrastructure/db/sequelize/model/order-item.model';
import OrderModel from '../../../infrastructure/db/sequelize/model/order.model';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create({
      id: entity.id,
      customerId: entity.customerId,
      items: entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
      })),
      total: entity.total(),
    }, {
      include: [{
        model: OrderItemModel,
      }]
    });
  }

  async update(entity: Order): Promise<void> {
      await OrderItemModel.destroy({
        where: { orderId: entity.id },
      });

      const items = entity.items.map((item) => ({
        id: item.id,
        name: item.name,
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        orderId: entity.id,
      }));

      await OrderItemModel.bulkCreate(items);

      await OrderModel.update({
        customerId: entity.customerId,
        total: entity.total(),
      }, {
        where: { id: entity.id },
      });
  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findByPk(id, {
      include: ['items'],
    });

    if (!orderModel) throw new Error('Order not found');

    const items = orderModel.items.map((item) => (
      new OrderItem(
        item.id,
        item.name,
        item.price,
        item.quantity,
        item.productId
      )));

    const order = new Order(orderModel.id, orderModel.customerId, items);

    return order;
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: ['items'],
    });

    return orderModels.map((orderModel) => {
      const items = orderModel.items.map((item) => (
        new OrderItem(
          item.id,
          item.name,
          item.price,
          item.quantity,
          item.productId
        )));

      return new Order(orderModel.id, orderModel.customerId, items);
    });
  }
}
