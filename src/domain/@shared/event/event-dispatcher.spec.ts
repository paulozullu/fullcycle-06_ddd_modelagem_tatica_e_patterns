import Address from '../../customer/value-object/address';
import CustomerAddressChangedEvent from '../../customer/event/customer-address-changed.event';
import CustomerCreatedEvent from '../../customer/event/customer-created.event';
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import EventDispatcher from './event-dispatcher';
import ProductCreatedEvent from '../../product/event/product-created.event';
import EnviaConsoleLog1Handler from '../../customer/event/handler/log1-when-customer-is-created.handler';
import EnviaConsoleLog2Handler from '../../customer/event/handler/log2-when-customer-is-created.handler';
import EnviaConsoleLogHandler from '../../customer/event/handler/log-when-customer-address-is-changed.handler';

describe('Domain events tests', () => {
  it('should register event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'].length
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);
  });

  it('should unregister event handler', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent']
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'].length
    ).toBe(0);
  });

  it('should unregister all event handlers', () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new SendEmailWhenProductIsCreatedHandler();

    eventDispatcher.register('ProductCreatedEvent', eventHandler);

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
    ).toMatchObject(eventHandler);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers()['ProductCreatedEvent']
    ).toBeUndefined();
  });
});

it('should notify event handlers', () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new SendEmailWhenProductIsCreatedHandler();
  const spyEventHandler = jest.spyOn(eventHandler, 'handle');
  eventDispatcher.register('ProductCreatedEvent', eventHandler);

  expect(
    eventDispatcher.getEventHandlers()['ProductCreatedEvent'][0]
  ).toMatchObject(eventHandler);

  const productCreatedEvent = new ProductCreatedEvent({
    name: 'Product 1',
    description: 'Product 1 description',
    price: 100,
  });

  // quando o notify for executado o SendEmailWhenProductIsCreatedHandler deve ser chamado
  eventDispatcher.notify(productCreatedEvent);

  expect(spyEventHandler).toHaveBeenCalled();
});

it('should notify when customer is created', () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler1 = new EnviaConsoleLog1Handler();
  const eventHandler2 = new EnviaConsoleLog2Handler();

  const spyEventHandler1 = jest.spyOn(eventHandler1, 'handle');
  const spyEventHandler2 = jest.spyOn(eventHandler2, 'handle');

  eventDispatcher.register('CustomerCreatedEvent', eventHandler1);
  eventDispatcher.register('CustomerCreatedEvent', eventHandler2);

  expect(
    eventDispatcher.getEventHandlers()['CustomerCreatedEvent'][0]
  ).toMatchObject(eventHandler1);
  expect(
    eventDispatcher.getEventHandlers()['CustomerCreatedEvent'][1]
  ).toMatchObject(eventHandler2);

  const customerCreatedEvent = new CustomerCreatedEvent({
    name: 'Customer 1',
    address: new Address('Street 1', 'City 1', 123, '12345-678'),
  });

  eventDispatcher.notify(customerCreatedEvent);

  expect(spyEventHandler1).toHaveBeenCalled();
  expect(spyEventHandler2).toHaveBeenCalled();
});

it('should notify when customer address is changed', () => {
  const eventDispatcher = new EventDispatcher();
  const eventHandler = new EnviaConsoleLogHandler();

  const spyEventHandler = jest.spyOn(eventHandler, 'handle');

  eventDispatcher.register('CustomerAddressChangedEvent', eventHandler);

  expect(
    eventDispatcher.getEventHandlers()['CustomerAddressChangedEvent'][0]
  ).toMatchObject(eventHandler);

  const customerAddressChangedEvent = new CustomerAddressChangedEvent({
    id: '1',
    name: 'Customer 1',
    address: new Address('New Street', 'New City', 456, '98765-432'),
  });

  eventDispatcher.notify(customerAddressChangedEvent);

  expect(spyEventHandler).toHaveBeenCalled();
});
