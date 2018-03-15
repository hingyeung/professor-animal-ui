describe('Home page', function () {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should show greeting', function () {
    cy.get('.greeting-container')
      .should('have.length', 1);
  });

  it('should have a link to "load animal definition" page', function () {
    cy.get('a[href="/load"]')
      .should('have.length', 1);
  });

  it('should have a link to "add new animal" page', function () {
    cy.get('a[href="/new"]')
      .should('have.length', 1);
  });

  it('should have an export button', function() {
    cy.get('button#export-btn')
      .should('have.length', 1);
  })
});