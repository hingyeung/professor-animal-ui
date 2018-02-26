
// This is the model for the form for selecting attributes of an animal.
// It has boolean value for each attribute name. This is different from the
// Animal model used to export animal definition to Professor Animal, where
// the attributes are stored as a list of strings (i.e. no values).
class AttributeDefinition {
  constructor(physical, types, behaviours, possible_behaviours, diet, considerations) {

    this.physical = physical;
    this.types = types;
    this.behaviours = behaviours;
    this.possible_behaviours = possible_behaviours;
    this.diet = diet;
    this.considerations = considerations;
  }

  // static transformFromSerialisedModel(attrDef) {
  //   // TODO Changed the structure of attributes.json. Note sure if this class has any value now.
  //   // return new AttributeDefinition(
  //   //   attrDef.physical.map((attr) => Attribute.transformFromSerialisedModel(attr)),
  //   //   attrDef.types.map((attr) => Attribute.transformFromSerialisedModel(attr)),
  //   //   attrDef.behaviours.map((attr) => Attribute.transformFromSerialisedModel(attr)),
  //   //   attrDef.possible_behaviours.map((attr) => Attribute.transformFromSerialisedModel(attr)),
  //   //   attrDef.diet.map((attr) => Attribute.transformFromSerialisedModel(attr)),
  //   //   attrDef.considerations.map((attr) => Attribute.transformFromSerialisedModel(attr)));
  //   return attrDef;
  // }

  // static get DEFAULT() {
  //   return new AttributeDefinition([], [], [], [], [], []);
  // }
}

export default AttributeDefinition;