import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../db/sequelize/model/customer.model';
import CustomerRepository from '../../domain/customer/repository/customer.repository';
import Customer from '../../domain/customer/entity/customer';
import Address from '../../domain/customer/value-object/address';

describe('CustomerRepository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('1', 'John Doe');
    const address = new Address('Main Street', 'New York', 100, '12345');
    customer.address = address;
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findByPk('1');

    expect(customerModel.toJSON()).toStrictEqual({
      id: '1',
      name: customer.name,
      street: address.street,
      city: address.city,
      number: address.number,
      zipcode: address.zip,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
    });
  });

  it('should update a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('2', 'Jane Doe');
    const address = new Address('Main Street', 'New York', 100, '12345');
    customer.address = address;
    await customerRepository.create(customer);

    customer.changeName('Jane Doe Updated');
    await customerRepository.update(customer);
    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it('should find a customer', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('3', 'John Doe');
    const address = new Address('Main Street', 'New York', 100, '12345');
    customer.address = address;
    await customerRepository.create(customer);

    const customerResult = await customerRepository.find(customer.id);

    expect(customer).toStrictEqual(customerResult);
  });

  it('should throw an error when customer is not found', async () => {
    const customerRepository = new CustomerRepository();

    await expect(customerRepository.find('1')).rejects.toThrow(
      'Customer not found'
    );
  });

  it('should find all customers', async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer('4', 'John Doe');
    const address1 = new Address('Main Street', 'New York', 100, '12345');
    customer1.address = address1;
    await customerRepository.create(customer1);

    const customer2 = new Customer('5', 'Jane Doe');
    const address2 = new Address('Main Street', 'New York', 100, '12345');
    customer2.address = address2;
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
    expect(customers).toStrictEqual([customer1, customer2]);
  });
});
