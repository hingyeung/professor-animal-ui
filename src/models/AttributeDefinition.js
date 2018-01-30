import Attribute from './Attribute';

class AttributeDefinition {
  constructor(physical, types, behaviours, possible_behaviours, diet, considerations) {

    this.physical = physical;
    this.types = types;
    this.behaviours = behaviours;
    this.possible_behaviours = possible_behaviours;
    this.diet = diet;
    this.considerations = considerations;
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
}

export default AttributeDefinition;