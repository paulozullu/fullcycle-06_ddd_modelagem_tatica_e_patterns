import Order from '../../domain/entity/order';
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';

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
   throw new Error('Method not implemented.');
  }

  async findAll(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
