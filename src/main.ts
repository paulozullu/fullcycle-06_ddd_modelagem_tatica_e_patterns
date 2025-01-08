import Address from "./entity/address";
import Customer from "./entity/customer";
import Order from "./entity/order";
import OrderItem from "./entity/order_items";

// aggregate (id)
let customer = new Customer("123", "Paulo Fabrício");
const address = new Address("Rua 1", "Cidade 1", 123, "12345-678");
customer.address = address;
customer.activate();

// aggregate (object - entity)
const item1 = new OrderItem("1", "Item 1", 100);
const items2 = new OrderItem("2", "Item 2", 15);
const order = new Order("1", customer.id, [item1, items2]);