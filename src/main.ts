import Order from "./domain/checkout/entity/order";
import OrderItem from "./domain/checkout/entity/order_items";
import Address from "./domain/customer/value-object/address";
import Customer from "./domain/customer/entity/customer";

// aggregate (id)
let customer = new Customer("123", "Paulo Fabrício");
const address = new Address("Rua 1", "Cidade 1", 123, "12345-678");
customer.address = address;
customer.activate();

// aggregate (object - entity)
const item1 = new OrderItem("1", "Item 1", 100, 2, "p1");
const items2 = new OrderItem("2", "Item 2", 15, 3, "p2");
const order = new Order("1", customer.id, [item1, items2]);