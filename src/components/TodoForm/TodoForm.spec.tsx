import '../../../cypress/support/commands';
import { mount } from '@cypress/react18';
import { TodoForm } from './TodoForm';

const users = [
  {
    id: 1,
    name: 'Leanne Graham',
    username: 'Bret',
    email: 'Sincere@april.biz',
  },
  {
    id: 2,
    name: 'Ervin Howell',
    username: 'Antonette',
    email: 'Shanna@melissa.tv',
  },
];

describe('TodoForm', () => {
  it('should render title input with placeholder', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('titleInput')
      .should('exist')
      .and('have.attr', 'placeholder');
  });

  it('should render user select with all users', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('userSelect')
      .find('option')
      .should('have.length', users.length + 1);
  });

  it('should have "Choose a user" as the first option', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('userSelect')
      .find('option')
      .first()
      .should('have.text', 'Choose a user');
  });

  it('should show title error when submitting with empty title', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('userSelect').select('Leanne Graham');
    cy.getByDataCy('submitButton').click();

    cy.contains('.error', 'Please enter a title').should('exist');
  });

  it('should show user error when submitting without selecting a user', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('titleInput').type('New todo');
    cy.getByDataCy('submitButton').click();

    cy.contains('.error', 'Please choose a user').should('exist');
  });

  it('should show both errors when submitting empty form', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('submitButton').click();

    cy.contains('.error', 'Please enter a title').should('exist');
    cy.contains('.error', 'Please choose a user').should('exist');
  });

  it('should not show errors by default', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.contains('.error', 'Please enter a title').should('not.exist');
    cy.contains('.error', 'Please choose a user').should('not.exist');
  });

  it('should hide title error on title change', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('submitButton').click();
    cy.contains('.error', 'Please enter a title').should('exist');

    cy.getByDataCy('titleInput').type('a');
    cy.contains('.error', 'Please enter a title').should('not.exist');
  });

  it('should hide user error on user change', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('submitButton').click();
    cy.contains('.error', 'Please choose a user').should('exist');

    cy.getByDataCy('userSelect').select('Leanne Graham');
    cy.contains('.error', 'Please choose a user').should('not.exist');
  });

  it('should call onAddTodo and clear form on valid submit', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('titleInput').type('New todo');
    cy.getByDataCy('userSelect').select('Leanne Graham');
    cy.getByDataCy('submitButton').click();

    cy.wrap(onAddTodo).should('have.been.calledWith', 'New todo', 1);

    cy.getByDataCy('titleInput').should('have.value', '');
    cy.getByDataCy('userSelect')
      .find('option:selected')
      .should('have.text', 'Choose a user');
  });

  it('should not call onAddTodo on invalid submit', () => {
    const onAddTodo = cy.stub();

    mount(<TodoForm users={users} onAddTodo={onAddTodo} />);

    cy.getByDataCy('submitButton').click();

    cy.wrap(onAddTodo).should('not.have.been.called');
  });
});
