import Address from "./address";

export default class Customer {
    _id: string;
    _name: string = "";
    _address!: Address;
    _active: boolean = false;

    constructor(id: string) {
        this._id = id;
        this._name = this.name;
        this.validate();
    }

    validate() {
        if (!this._name.length) {
            throw new Error("Name is required");
        }

        if (!this._id.length) {
            throw new Error("ID is required");
        }
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get address() {
        return this._address;
    }

    get active() {
        return this._active;
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    set address(address: Address) {
        this._address = address;
    }

    activate() {
        if (!this._address) {
            throw new Error("Address is mandatory to activate a customer");
        }
        this._active = true;
    }

    deactivate() {
        this._active = false;
    }
}