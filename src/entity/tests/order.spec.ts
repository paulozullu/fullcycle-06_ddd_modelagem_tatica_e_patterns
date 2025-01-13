import Order from '../order';
import OrderItem from '../order_items';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrow('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('123', '', [])).toThrow(
      'customerId is required'
    );
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('123', '123', [])).toThrow(
      'Item quantity must be greater than 0'
    );
  });

  
  it('should calculate total', () => {
   const item = new OrderItem('1', 'item', 100, 2, "p1");
   const item2 = new OrderItem('2', 'item2', 200, 2, "p2");
   
   const order = new Order('o1', 'c1', [item]);
   const total = order.total();
   expect(total).toBe(200);

   const order2 = new Order('o2', 'c2', [item, item2]);
   const total2 = order2.total();
   expect(total2).toBe(600);
  });

  it('should throw if the item quantity > 0', () => {
   
    expect(() => {
      const item = new OrderItem('1', 'item', 100, 0, "p1");
      const order = new Order('o1', 'c1', [item]);
    }).toThrow('Item quantity must be greater than 0');
 
   });
});
