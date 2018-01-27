class Attribute {
  constructor(name, value) {
    this._name = name;
    this._value = value;
  }

  static transformFromSerialisedModel(attrObj) {
    return new Attribute(attrObj.name, attrObj.default);
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