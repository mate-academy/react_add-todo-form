import React from 'react';
import { mount } from '@cypress/react';
import TodoList from './TodoList';
import todos from '../../api/todos';

describe('TodoList', () => {
  it('should have a correct length', () => {
    // eslint-disable-next-line react/jsx-filename-extension
    mount(<TodoList todos={todos} />);
    cy.get('li')
      .should('have.length', todos.length);
  });
});
