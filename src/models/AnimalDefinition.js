class AnimalDefinition {
  // from: [{ name: "Lion", physical: ["legs", "tail"], ... }]
  // to: { Lion: { physical: { legs: true, tail: true } } }
  static convertFromFileModelToAppModel(animalDefinitionFromFile, attributeDefinition) {
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

    return AnimalDefinition.addUnusedAttributeToAnimals(animalDefinitionMap, attributeDefinition);
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

  // When the animal definition is loaded from file, each animal definition only contains attributes that it has,
  // but not the attributes that it doesn't have, even for attributes that are defined as default attributes in attributes.json.
  // This is done to save storage space. However, the AnimalForm should allow user to modify all attributes,
  // regardless whether the attributes are currently selected for an animal for not.
  // This function hydrates the animal definition loaded from file to make sure all animals have all attributes
  // selectable on the form (added attributes are default to false).
  static addUnusedAttributeToAnimals(oldAnimalDefinition, attributeDefinition) {
    // let attributeDefinition = props.attributeDefinition;
    // must do deep cloning for hydratedAnimalDefinition would just be a
    // reference to oldAnimalDefinition
    let hydratedAnimalDefinition = JSON.parse(JSON.stringify(oldAnimalDefinition));

    if (attributeDefinition) {
      Object.keys(attributeDefinition).forEach(attributeType => {
        Object.keys(attributeDefinition[attributeType]).forEach(attributeName => {
          Object.keys(hydratedAnimalDefinition).forEach(animalId => {
            if (!oldAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName]) {
              hydratedAnimalDefinition[animalId]['attributeMap'][attributeType][attributeName] =
                // default value is false from attributeDefinition
                attributeDefinition[attributeType][attributeName];
            }
          });
        });
      });
    }

    return hydratedAnimalDefinition;
  }

  static convertFromMap(attributeMap) {
    let attributeStringList = [];
    Object.keys(attributeMap).forEach(attributeName => {
      if (attributeMap[attributeName]) {
        attributeStringList.push(attributeName);
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