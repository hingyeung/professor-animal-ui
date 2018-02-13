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
          physical: this.convertFromArrayOfString(animalFromFile.physical),
          types: this.convertFromArrayOfString(animalFromFile.types),
          behaviours: this.convertFromArrayOfString(animalFromFile.behaviours),
          diet: this.convertFromArrayOfString(animalFromFile.diet),
          possible_behaviours: this.convertFromArrayOfString(animalFromFile.possible_behaviours),
          considerations: this.convertFromArrayOfString(animalFromFile.considerations)
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
        physical: this.convertFromMap(animalFromApp.attributeMap.physical),
        types: this.convertFromMap(animalFromApp.attributeMap.types),
        behaviours: this.convertFromMap(animalFromApp.attributeMap.behaviours),
        diet: this.convertFromMap(animalFromApp.attributeMap.diet),
        possible_behaviours: this.convertFromMap(animalFromApp.attributeMap.possible_behaviours),
        considerations: this.convertFromMap(animalFromApp.attributeMap.considerations)
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
      return [];
    }

    attributeListOfAGroup.forEach(attributeStr => {
      attributeMapForAGroup[attributeStr] = true;
    });

    return attributeMapForAGroup;
  }
}

export default AnimalDefinition;