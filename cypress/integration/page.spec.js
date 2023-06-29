import users from '../../src/api/users';
import todos from '../../src/api/todos';

const page = {
  todoItems: () => cy.get('.TodoInfo'),
  titleInput: () => cy.getByDataCy('titleInput'),
  titleError: () => cy.contains('.error', 'Please enter a title'),
  userSelect: () => cy.getByDataCy('userSelect'),
  userError: () => cy.contains('.error', 'Please choose a user'),
  selectedOption: () => page.userSelect().get('option:selected'),
  addButton: () => cy.getByDataCy('submitButton'),
};

let failed = false;

Cypress.on('fail', (e) => {
  failed = true;
  throw e;
});

describe('Page', () => {
  beforeEach(() => {
    // Other tests are executed anyway, so it is better to see all errors
    // if (failed) Cypress.runner.stop();

    cy.visit('/');
  });

  it('should show existing todos by default', () => {
    page.todoItems()
      .should('have.length', todos.length);
  });

  it('should have all required form elements', () => {
    page.titleInput()
      .should('have.attr', 'placeholder')

    page.userSelect()
      .should('exist');

    page.addButton()
      .should('have.attr', 'type', 'submit')
  });

  it('should have an empty first option in the select', () => {
    page.userSelect()
      .find('option')
      .first()
      .should('have.text', 'Choose a user');
  });

  it('should have all the users in the select', () => {
    page.userSelect()
      .find('option')
      .should('have.length', users.length + 1);

    page.userSelect()
      .find('option')
      .eq(5)
      .should('have.text', users[4].name);

    page.userSelect()
      .find('option')
      .last()
      .should('have.text', users.at(-1).name);
  });

  it('should have empty values by default', () => {
    page.titleInput()
      .should('have.value', '');

    page.selectedOption()
      .should('have.text', 'Choose a user');
  });

  it('should not show errors by default', () => {
    page.titleError()
      .should('not.exist');

    page.userError()
      .should('not.exist');
  });

  it('should allow to enter a title', () => {
    page.titleInput()
      .type('Hello world')
      .should('have.value', 'Hello world');
  });

  it('should allow to select a user', () => {
    const { name } = users[5];

    page.userSelect()
      .select(name);

    page.selectedOption()
      .should('have.text', name);
  });

  it('should add a todo to the end of the list', () => {
    const todoTitle = 'to do something';

    page.titleInput().type(todoTitle);
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.todoItems()
      .should('have.length', todos.length + 1);

    page.todoItems()
      .last()
      .find('.TodoInfo__title')
      .should('have.text', todoTitle);
  });

  it('should add a todo with a selected user', () => {
    const { name, email } = users[5];
    const todoTitle = 'to do something';

    page.titleInput().type(todoTitle);
    page.userSelect().select(name);
    page.addButton().click();

    page.todoItems()
      .last()
      .find('.UserInfo')
      .should('have.text', name)
      .and('have.attr', 'href', `mailto:${email}`);
  });

  it('should add a not completed todo', () => {
    page.titleInput().type('Do something');
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.todoItems()
      .last()
      .should('not.have.class', 'TodoInfo--completed');
  });

  it('should add a title with the max existing id + 1', () => {
    page.titleInput().type('Something');
    page.userSelect().select(users[5].name);
    page.addButton().click();

    const maxId = Math.max(...todos.map(todo => todo.id));

    page.todoItems()
      .last()
      .should('have.attr', 'data-id', maxId + 1)
  });

  it('should clear a form after adding a user', () => {
    page.titleInput().type('Something');
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.titleInput()
      .should('have.value', '');

    page.selectedOption()
      .should('have.text', 'Choose a user');
  });

  it('should show a title error if the title is empty', () => {
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.titleError()
      .should('exist');
  });

  it('should not show a user error if a user is selected', () => {
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.userError()
      .should('not.exist');
  });

  it('should show a user error if a user is not selected', () => {
    page.titleInput().type('Something');
    page.addButton().click();

    page.userError()
      .should('exist');
  });

  it('should not show a title error if a title is entered', () => {
    page.titleInput().type('Something');
    page.addButton().click();

    page.titleError()
      .should('not.exist');
  });

  it('should show all errors if form is empty', () => {
    page.addButton().click();

    page.titleError()
      .should('exist');

    page.userError()
      .should('exist');
  });

  it('should not add a todo on title error', () => {
    page.userSelect().select(users[5].name);
    page.addButton().click();

    page.todoItems()
      .should('have.length', todos.length);
  });

  it('should not add a todo on user error', () => {
    page.titleInput().type('Something');
    page.addButton().click();

    page.todoItems()
      .should('have.length', todos.length);
  });

  it('should keep a selected user on title error', () => {
    const { name } = users[5];

    page.userSelect().select(name);
    page.addButton().click();

    page.todoItems()
      .should('have.length', todos.length);

    page.selectedOption()
      .should('have.text', name);
  });

  it('should keep a title on user error', () => {
    const todoTitle = 'New title';

    page.titleInput().type(todoTitle);
    page.addButton().click();

    page.todoItems()
      .should('have.length', todos.length);

    page.titleInput()
      .should('have.value', todoTitle);
  });

  it('should hide a title error on title change', () => {
    page.addButton().click();
    page.titleInput().type('q');

    page.titleError()
      .should('not.exist');
  });

  it('should hide a user error on user change', () => {
    page.addButton().click();
    page.userSelect().select(users[5].name);

    page.userError()
      .should('not.exist');
  });

  it('should keep a user error on title change', () => {
    page.addButton().click();
    page.titleInput().type('q');

    page.userError()
      .should('exist');
  });

  it('should keep a title error on user change', () => {
    page.addButton().click();
    page.userSelect().select(users[5].name);

    page.titleError()
      .should('exist');
  });
});
