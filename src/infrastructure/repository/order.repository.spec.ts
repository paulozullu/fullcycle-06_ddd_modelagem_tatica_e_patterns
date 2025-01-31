import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import ProductModel from '../db/sequelize/model/product.model';
import OrderModel from '../db/sequelize/model/order.model';
import Customer from '../../domain/entity/customer';
import CustomerRepository from './customer.repository';
import Address from '../../domain/entity/address';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';
import OrderItem from '../../domain/entity/order_items';
import Order from '../../domain/entity/order';
import OrderRepository from './order.repository';

describe('OrderRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      CustomerModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 'City', 7, 'Zip');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      5,
      product.id
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findByPk(order.id, {
      include: ['items'],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel.id).toBe(order.id);
    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customerId: customer.id,
      total: 500,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          orderId: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it('should update an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 'City', 7, 'Zip');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      5,
      product.id
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    orderItem.changeQuantity(10)
    orderItem.changePrice(product.price + 5);
    orderItem.changeName(`${product.name} Updated`);

    order.items = [orderItem];

    await orderRepository.update(order);

    const orderModel = await OrderModel.findByPk(order.id, {
      include: ['items'],
    });

    expect(orderModel).not.toBeNull();
    expect(orderModel.id).toBe(order.id);
    expect(orderModel.toJSON()).toStrictEqual({
      id: '1',
      customerId: customer.id,
      total: orderItem.quantity * orderItem.price,
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: 105,
          quantity: 10,
          orderId: order.id,
          productId: orderItem.productId,
        },
      ],
    });
  });

  it('should find an order', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 'City', 7, 'Zip');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      5,
      product.id
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const foundOrder = await orderRepository.find(order.id);

    expect(foundOrder).not.toBeNull();
    expect(foundOrder.id).toBe(order.id);
    expect(foundOrder.customerId).toBe(order.customerId);
    expect(foundOrder.items).toStrictEqual(order.items);
  });

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Street', 'City', 7, 'Zip');
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('1', 'Product', 100);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      5,
      product.id
    );

    const order = new Order('1', customer.id, [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      10,
      product.id
    );

    const order2 = new Order('2', customer.id, [orderItem2]);

    await orderRepository.create(order2);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(2);
    expect(orders[0].id).toBe(order.id);
    expect(orders[0].customerId).toBe(order.customerId);
    expect(orders[0].items).toStrictEqual(order.items);

    expect(orders[1].id).toBe(order2.id);
    expect(orders[1].customerId).toBe(order2.customerId);
    expect(orders[1].items).toStrictEqual(order2.items);
  });
});
