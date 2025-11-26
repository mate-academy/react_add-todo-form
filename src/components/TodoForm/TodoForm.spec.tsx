import { mount } from '@cypress/react18';
import { TodoForm } from './TodoForm';
import { User } from '../../App';

const mockUsers: User[] = [
  {
    id: 1,
    name: 'John Doe',
    username: 'johndoe',
    email: 'john@example.com',
  },
  {
    id: 2,
    name: 'Jane Smith',
    username: 'janesmith',
    email: 'jane@example.com',
  },
];

describe('TodoForm', () => {
  it('should render form with all fields', () => {
    const mockOnAddTodo = cy.stub();

    mount(<TodoForm onAddTodo={mockOnAddTodo} users={mockUsers} />);

    cy.get('label[for="todo-title"]').should('contain', 'Title');
    cy.get('input#todo-title').should('be.visible');
    cy.get('label[for="user-select"]').should('contain', 'User');
    cy.get('select#user-select').should('be.visible');
    cy.get('button[type="submit"]').should('contain', 'Add');
  });

  it('should have "Choose a user" as default option', () => {
    const mockOnAddTodo = cy.stub();

    mount(<TodoForm onAddTodo={mockOnAddTodo} users={mockUsers} />);

    cy.get('select#user-select option:selected').should(
      'contain',
      'Choose a user',
    );
  });

  it('should display all users in the select dropdown', () => {
    const mockOnAddTodo = cy.stub();

    mount(<TodoForm onAddTodo={mockOnAddTodo} users={mockUsers} />);

    cy.get('select#user-select option').should('have.length', 3);
    cy.get('select#user-select option')
      .first()
      .should('contain', 'Choose a user');
    cy.get('select#user-select option').eq(1).should('contain', 'John Doe');
    cy.get('select#user-select option').eq(2).should('contain', 'Jane Smith');
  });

  it('should show errors when submitting empty form', () => {
    const mockOnAddTodo = cy.stub();

    mount(<TodoForm onAddTodo={mockOnAddTodo} users={mockUsers} />);

    cy.get('button[type="submit"]').click();
    cy.contains('.error', 'Please enter a title').should('be.visible');
    cy.contains('.error', 'Please choose a user').should('be.visible');
  });
});
