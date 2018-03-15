describe('Animal form', function () {
  const defaultNumberOfAttributes = 99;
  const numberOfAttributesForCheetah = 109;
  beforeEach(() => {
    cy.loadAnimalDefinition();

    // this create alias of the FIRST element returned by get()
    cy.get('.animal-list-container .nav-item')
      .as('animalList');
  });

  it('should modify existing animal', () => {
    const attributeTypes = ['physical', 'types', 'behaviours', 'diet'];
    clickAnimalLink('Cheetah');
    checkAttributeGroups(attributeTypes);
    updateAnimalForm(attributeTypes);
    clickAnimalLink('Cheetah');
    verifyFormIsUpdated(attributeTypes, numberOfAttributesForCheetah);
  });

  it('should add new animal', function () {
    const attributeTypes = ['physical', 'types', 'behaviours', 'possible_behaviours', 'diet', 'considerations'];
    // cy.get('.new-animal-link')
    //   .click();
    clickAnimalLink('+ Add a new animal');
    checkAttributeGroups(attributeTypes);

    verifyAllCheckboxesAreChecked();

    cy.get('#animal-name')
      .type('dragon');

    updateAnimalForm(attributeTypes);

    // "dragon" should be on the animal list
    cy.get('.animal-list-container .nav-item')
      .should('contain', 'dragon');

    // click the "dragon"
    clickAnimalLink('dragon');
    verifyFormIsUpdated(attributeTypes, defaultNumberOfAttributes + 6);
  });

  function verifyFormIsUpdated(attributeTypes, numberOfAttributes) {
    // all check boxes should be checked
    cy.get('input.attribute-value-yes:checked')
      .should('have.length', numberOfAttributes);

    // and all 6 new attributes should be there
    attributeTypes.forEach((type) => {
      cy.get('.attribute-row .attribute-name')
        .should('contain', `new ${type}`);
    });
  }

  function verifyAllCheckboxesAreChecked() {
    cy.get('input.attribute-value-yes:checked')
      .should('have.length', 0);

    // should have same number of attributes in attributes.json
    cy.get('input.attribute-value-no:checked')
      .should('have.length', defaultNumberOfAttributes);
  }

  function clickAnimalLink(linkText) {
    cy.get(`.animal-list-container .nav-item a:contains(${linkText})`)
      .contains(linkText)
      .click();
  }

  function checkAttributeGroups(attributeTypes) {
    attributeTypes.forEach((type, index) => {
      cy.get('.attribute-type')
        .should(($types) => {
          expect($types.eq(index)).to.contain(type);
        });
    });
    // cy.get('.attribute-type')
    //   .should(($types) => {
    //     expect($types.eq(0)).to.contain('physical');
    //     expect($types.eq(1)).to.contain('types');
    //     expect($types.eq(2)).to.contain('behaviours');
    //     expect($types.eq(3)).to.contain('possible_behaviours');
    //     expect($types.eq(4)).to.contain('diet');
    //     expect($types.eq(5)).to.contain('considerations');
    //   });
  }

  function updateAnimalForm(attributeTypes) {
    attributeTypes.forEach((type) => {
      cy.get(`.attribute-group-${type}`).as(`attribute-group-${type}`);
      cy.get(`@attribute-group-${type}`)
        .find('input')
        .type(`new ${type}`);
      cy.get(`@attribute-group-${type}`)
        .find('button')
        .click();
      // the attribute just got added should appear on the form
      cy.get('.attribute-row .attribute-name')
        .should('contain', `new ${type}`);
    });

    // this step takes very long, too bad, i can mock the attributes.json because
    // it is located outside cypress directory.
    // or i can load the attributes.json from server side.
    cy.get('input.attribute-value-yes')
      .check();

    // click save
    cy.get('.save-animal-btn')
      .first()
      .click();

    // the form should disappear
    cy.get('.animal-form')
      .should('have.length', 0);
  }
});