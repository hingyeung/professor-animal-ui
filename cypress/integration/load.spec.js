describe('Load page', function () {
  beforeEach(function () {
    cy.visit('/load')
  });

  it('should have a file input field', function() {
    cy.get('input[type="file"]').as('fileInput')
      .should('have.length', 1);

    cy.fixture('animals')
      .then((json) => {
        const testFile = new File([JSON.stringify(json)], 'animals.json', {type : 'application/json'});
        cy.get('@fileInput')
          .trigger('change', {testFile});
      });

    cy.get('.animal-list-container li.nav-item').as('animalList')
      .should('have.length', 4)
      .first()
      .find('a[href="/new"]')
      .should('have.length', 1)
      .should('contain', '+ Add a new animal');

    cy.get('@animalList')
      .then(($list) => {
        cy.wrap($list[1]).find('a').should('contain', 'Cheetah');
        cy.wrap($list[2]).find('a').should('contain', 'Elephant');
        cy.wrap($list[3]).find('a').should('contain', 'Lion');
      });
  });

  /*
  it('should export animal definition file', function() {
    // homedir set in package.json
    // https://docs.cypress.io/guides/guides/environment-variables.html#
    const downloadedFile = `${Cypress.env("homedir")}/${Cypress.env("downloadDir")}/test.json`;
    // cy.exec(`rm -f ${downloadedFile}`);
    // cy.get('button#export-btn')
    //   .click();

    // TODO this doesn't work because chrome downloads the file to ~/Downloads directory.
    // cy.readFile() can't read outside the application root (where cypress.json is).
    // cy.readFile(downloadedFile)
    //   .then((str) => {
    //     const animals = JSON.parse(str);
    //     assert(animals instanceof Array);
    //   });
  });
  */
});