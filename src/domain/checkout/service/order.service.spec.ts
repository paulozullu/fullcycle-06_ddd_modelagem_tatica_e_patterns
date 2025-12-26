import Customer from "../../customer/entity/customer";
import OrderService from "./order.service";
import OrderItem from "../entity/order_items";
import Order from "../entity/order";

describe('OrderService unit tests', () => {
    it('should get total of all orders', () => {
        const item1 = new OrderItem('i1', 'item 1', 2, 10, 'p1');
        const item2 = new OrderItem('i2', 'item 2', 3, 20, 'p2');

        const order = new Order('o1', 'c1', [item1]);
        const order2 = new Order('o2', 'c1', [item2]);

        const total = OrderService.total([order, order2]);

        expect(total).toBe(80);
    });

    it ('should place an order', () => {
        const customer = new Customer('c1', 'John Doe');
        const item1 = new OrderItem('i1', 'item 1', 2, 10, 'p1');

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(10);
        expect(order.total()).toBe(20);
    });
});