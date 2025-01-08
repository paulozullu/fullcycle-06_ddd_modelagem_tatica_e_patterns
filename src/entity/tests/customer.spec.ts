import Address from '../address';
import Customer from '../customer';

describe('Customer unit tests', () => {
  it('should throw error when id is empty', () => {
    expect(() => new Customer('', 'John')).toThrowError('ID is required');
  });

  it('should throw error when name is empty', () => {
    expect(() => new Customer('123', '')).toThrowError('Name is required');
  });

  it('should change name', () => {
    const customer = new Customer('123', 'John');
    customer.changeName('Jane');

    expect(customer.name).toBe('Jane');
  });

  it('should activate customer', () => {
    const customer = new Customer('123', 'John');
    const address = new Address('Main St', 'Chicago', 12, '12345');
    customer.address = address;
    customer.activate();

    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate customer', () => {
    const customer = new Customer('123', 'John');
    customer.deactivate();

    expect(customer.isActive()).toBe(false);
  });
});

it('should throw error when address is undefined', () => {
  const customer = new Customer('123', 'John');

  expect(() => {
    customer.activate();
  }).toThrowError('Address is mandatory to activate a customer');

});
