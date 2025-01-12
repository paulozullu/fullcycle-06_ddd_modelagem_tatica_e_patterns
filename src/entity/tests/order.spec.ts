import Order from '../order';
import OrderItem from '../order_items';

describe('Order unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Order('', '123', [])).toThrowError('Id is required');
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('123', '', [])).toThrowError(
      'customerId is required'
    );
  });

  it('should throw error when customerId is empty', () => {
    expect(() => new Order('123', '123', [])).toThrowError(
      'Item quantity must be greater than 0'
    );
  });

  
  it('should calculate total', () => {
   const item = new OrderItem('1', 'item', 100);
   const item2 = new OrderItem('2', 'item2', 200);
   
   const order = new Order('o1', 'c1', [item]);
   const total = order.total();
   expect(total).toBe(100);

   const order2 = new Order('o2', 'c2', [item, item2]);
   const total2 = order2.total();
   expect(total2).toBe(300);
  });
});
