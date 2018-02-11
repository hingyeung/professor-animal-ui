class AnimalDefinition {
  // from: [{ name: "Lion", physical: ["legs", "tail"], ... }]
  // to: { Lion: { physical: { legs: true, tail: true } } }
  static convertFromFileModel(animalDefinitionFromFile) {
    let animalDefinitionMap = {};
    animalDefinitionFromFile.forEach(animalFromFile => {
      animalDefinitionMap[animalFromFile.id] = {
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