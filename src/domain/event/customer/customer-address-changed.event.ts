import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dataTimeOccured: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dataTimeOccured = new Date();
    this.eventData = eventData;
  }
}
