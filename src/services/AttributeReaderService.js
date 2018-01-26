import Attribute from '../models/Attribute';
class AttributeReaderService {
  get readFile() {
    this.fileContent = require('../data/attributes.json');

    // return this.fileContent;
    return this._buildAttributeTypeMap(this.fileContent);
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

export default AttributeReaderService;