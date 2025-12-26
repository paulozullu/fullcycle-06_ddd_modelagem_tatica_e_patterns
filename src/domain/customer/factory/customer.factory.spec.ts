import Address from '../value-object/address';
import CustomerFactory from './customer.factory';

describe('Customer Factory unit tests', () => {
  it('should create a customer', () => {
    const customer = CustomerFactory.create('John');

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBeUndefined();
  });
  
  it('should create a customer with address', () => {
    const address = new Address('Street', 'City', 12345, 'Zipcode');
    const customer = CustomerFactory.createWithAddress('John', address);

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe('John');
    expect(customer.address).toBe(address);
  });
});
