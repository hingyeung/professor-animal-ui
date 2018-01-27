class Attribute {
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }

  get name() {
    return this._name;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

export default Attribute;