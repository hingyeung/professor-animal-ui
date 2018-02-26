class AttributeDefinitionReaderService {
  get readFile() {
    return require('../data/attributes.json');
  }
}

export default AttributeDefinitionReaderService;