class Animal {
  constructor(name, attributeMap) {
    this.name = name;
    this.populateAnimalAttributes(attributeMap);
  }

  populateAnimalAttributes(attributeMap) {
    this.physical = this.setAttribute(attributeMap.physical);
    this.types = this.setAttribute(attributeMap.types);
    this.behaviours = this.setAttribute(attributeMap.behaviours);
    this.diet = this.setAttribute(attributeMap.diet);
    this.possible_behaviours = this.setAttribute(attributeMap.possible_behaviours);
    this.considerations = this.setAttribute(attributeMap.considerations);
  }

  setAttribute(attributeKey) {
    // TODO this doesn't work with the new currentAttributeMapForForm map-within-map structure
    return attributeKey.filter((attribute) => {
      return attribute.value === true;
    })
    .map((attribute) => {
      return attribute.name;
    });
  }
}

export default Animal;