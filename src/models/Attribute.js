class Attribute {
  constructor(name, defaultValue) {
    this._name = name;
    this._defaultValue = defaultValue;
    this._value = '';
  }

  get name() {
    return this._name;
  }

  get defaultValue() {
    return this._defaultValue;
  };

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }
}

export default Attribute;