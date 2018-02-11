import Attribute from '../models/Attribute';
import AttributeDefinition from '../models/AttributeDefinition';

class AttributeDefinitionReaderService {
  get readFile() {
    return AttributeDefinition.transformFromSerialisedModel(require('../data/attributes.json'));
  }

  // attribute-type attributeMap
  // {
  // "physical": [{attributes}, {attributes}],
  // "behaviour": [{attributes}, {attributes}]
  // }
  _buildAttributeTypeMap(attributeList) {
    let attributeTypeMap = {};
    attributeList.forEach(attribute => {

      attributeTypeMap[attribute.type] =
        attributeTypeMap[attribute.type] ?
          attributeTypeMap[attribute.type].concat(
            new Attribute(attribute.name, attribute.default)) :
          [new Attribute(attribute.name, attribute.default)];

    });
    return attributeTypeMap;
  }
}

export default AttributeDefinitionReaderService;