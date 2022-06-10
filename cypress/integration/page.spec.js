import users from '../../src/api/users';
import todos from '../../src/api/todos';

const page = {
  visit() {
    cy.visit('/');
  },

  get titleInput() {
    return cy.getByDataCy('titleInput');
  },

  get userSelect() {
    return cy.getByDataCy('userSelect');
  },

  get selectedOption() {
    return cy.get('select[data-cy="userSelect"] option:selected');
  },

  get addButton() {
    return cy.contains('button', 'Add');
  }
};

describe('Page', () => {
  beforeEach(() => {
    page.visit();
  });

  it('should have "Add todo" form', () => {
    page.titleInput
      .should('have.attr', 'placeholder');

    page.selectedOption
      .should('have.text', 'Choose a user');

    page.addButton
      .should('exist');
  });

  it('should show an error if "title" is empty', () => {
    const { name } = users[5];

    page.titleInput
      .invoke('val', '');

    page.userSelect
      .select(name);

    page.addButton
      .click();

    cy.contains('Please enter the title')
      .should('exist');
  });

  it('should show an error if user is not selected', () => {
    page.titleInput
      .type('to do something');

    page.addButton
      .click();

    cy.contains('Please choose a user')
      .should('exist');
  });

  it('should add todo to the list', () => {
    const { name, email } = users[5];
    const todoTitle = 'to do something';

    page.titleInput
      .type(todoTitle);

    page.userSelect
      .select(name);

    page.addButton
      .click();

    cy.get('.todoList')
      .should('have.length', todos.length + 1);

    cy.contains('.todoList', todoTitle)
      .should('contain.text', name)
      .and('contain.text', email)
      .and('contain.text', 'Not completed')
  });
});
