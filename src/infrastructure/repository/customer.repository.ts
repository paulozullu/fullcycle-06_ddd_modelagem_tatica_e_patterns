import Address from '../../domain/entity/address';
import Customer from '../../domain/entity/customer';
import CustomerRepositoryInterface from '../../domain/repository/customer.repository.interface';
import CustomerModel from '../db/sequelize/model/customer.model';

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.address.street,
      city: entity.address.city,
      number: entity.address.number,
      zipcode: entity.address.zip,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.address.street,
        city: entity.address.city,
        number: entity.address.number,
        zipcode: entity.address.zip,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error('Customer not found');
    }
    const customer = new Customer(customerModel.id, customerModel.name);
    customer.addRewardPoints(customerModel.rewardPoints);

    const address = new Address(
      customerModel.street,
      customerModel.city,
      customerModel.number,
      customerModel.zipcode
    );
    customer.changeAddress(address);

    if (customerModel.active) {
      customer.activate();
    }

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customers = await CustomerModel.findAll();

    return customers.map((customerModel) => {
      const customer = new Customer(customerModel.id, customerModel.name);
      customer.address = new Address(
        customerModel.street,
        customerModel.city,
        customerModel.number,
        customerModel.zipcode
      );

      return customer;
    });
  }
}
