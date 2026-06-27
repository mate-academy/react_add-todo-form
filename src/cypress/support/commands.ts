Cypress.Commands.add('getByDataCy', (value: string) => {
  return cy.get(`[data-cy="${value}"]`);
});
