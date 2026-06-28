Cypress.Commands.add('getByDataCy', (selector: string) => {
  return cy.get(`[data-cy="${selector}"]`);
});
