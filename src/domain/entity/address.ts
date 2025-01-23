export default class Address {
  _street: string = '';
  _city: string = '';
  _number: number = 0;
  _zip: string = '';

  constructor(street: string, city: string, number: number, zip: string) {
    this._street = street;
    this._city = city;
    this._number = number;
    this._zip = zip;

    this.validate();
  }

  validate() {
    if (!this._street.length) {
      throw new Error('Street is required');
    }

    if (!this._number) {
      throw new Error('Number is required');
    }

    if(!this._zip.length) {
      throw new Error('Zip code must have 5 digits');
    }

    if (!this._city.length) {
      throw new Error('City is required');
    }
  }

  toString() {
    return `${this._street}, ${this._number} - ${this._zip}, ${this._city}`;
  }
}
