import Attribute from './Attribute';

class AttributeDefinition {
  constructor(physical, types, behaviours, possible_behaviours, diet, considerations) {

    this._physical = physical;
    this._types = types;
    this._behaviours = behaviours;
    this._possible_behaviours = possible_behaviours;
    this._diet = diet;
    this._considerations = considerations;
  }

  static transformFromSerialisedModel(attrDef) {
    return new AttributeDefinition(
      attrDef.physical.map((attr) => Attribute.transformFromSerialisedModel(attr)),
      attrDef.types.map((attr) => Attribute.transformFromSerialisedModel(attr)),
      attrDef.behaviours.map((attr) => Attribute.transformFromSerialisedModel(attr)),
      attrDef.possible_behaviours.map((attr) => Attribute.transformFromSerialisedModel(attr)),
      attrDef.diet.map((attr) => Attribute.transformFromSerialisedModel(attr)),
      attrDef.considerations.map((attr) => Attribute.transformFromSerialisedModel(attr)));
  }

  get physical() {
    return this._physical;
  }

  get types() {
    return this._types;
  }

  get behaviours() {
    return this._behaviours;
  }

  get possible_behaviours() {
    return this._possible_behaviours;
  }

  get diet() {
    return this._diet;
  }

  get considerations() {
    return this._considerations;
  }
}

export default AttributeDefinition;