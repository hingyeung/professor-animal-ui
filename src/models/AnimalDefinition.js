class AnimalDefinition {
  // from: [{ name: "Lion", physical: ["legs", "tail"], ... }]
  // to: { Lion: { physical: { legs: true, tail: true } } }
  static convertFromFileModelToAppModel(animalDefinitionFromFile) {
    let animalDefinitionMap = {};
    animalDefinitionFromFile.forEach(animalFromFile => {
      animalDefinitionMap[animalFromFile.id] = {
        id: animalFromFile.id,
        name: animalFromFile.name,
        attributeMap: {
          physical: AnimalDefinition.convertFromArrayOfString(animalFromFile.physical),
          types: AnimalDefinition.convertFromArrayOfString(animalFromFile.types),
          behaviours: AnimalDefinition.convertFromArrayOfString(animalFromFile.behaviours),
          diet: AnimalDefinition.convertFromArrayOfString(animalFromFile.diet),
          possible_behaviours: AnimalDefinition.convertFromArrayOfString(animalFromFile.possible_behaviours),
          considerations: AnimalDefinition.convertFromArrayOfString(animalFromFile.considerations)
        }
      };
    });

    return animalDefinitionMap;
  }

  // from: { Lion: { physical: { legs: true, tail: true } } }
  // to: [{ name: "Lion", physical: ["legs", "tail"], ... }]
  static convertFromAppModelToFileModel(animalDefinitionFromApp) {
    let animalDefinitionListInFileModel = [];
    Object.keys(animalDefinitionFromApp).forEach(animalId => {
      const animalFromApp = animalDefinitionFromApp[animalId];
      const animalForFile = {
        id: animalFromApp.id,
        name: animalFromApp.name,
        physical: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.physical),
        types: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.types),
        behaviours: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.behaviours),
        diet: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.diet),
        possible_behaviours: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.possible_behaviours),
        considerations: AnimalDefinition.convertFromMap(animalFromApp.attributeMap.considerations)
      };
      animalDefinitionListInFileModel.push(animalForFile);
    });

    return animalDefinitionListInFileModel;
  }

  static convertFromMap(attributeMap) {
    let attributeStringList = [];
    Object.keys(attributeMap).forEach(attributeName => {
      if (attributeMap[attributeName]) {
        attributeStringList.push(attributeName)
      }
    });

    return attributeStringList;
  }

  static convertFromArrayOfString(attributeListOfAGroup) {
    let attributeMapForAGroup = {};
    if (!Array.isArray(attributeListOfAGroup)) {
      return {};
    }

    attributeListOfAGroup.forEach(attributeStr => {
      attributeMapForAGroup[attributeStr] = true;
    });

    return attributeMapForAGroup;
  }
}

export default AnimalDefinition;