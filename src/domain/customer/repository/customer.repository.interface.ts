import Customer from '../customer/entity/customer';
import RepositoryInterface from '../@shared/repository/repository.interface';

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
