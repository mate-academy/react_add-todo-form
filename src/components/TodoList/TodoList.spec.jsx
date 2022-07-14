/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from '@cypress/react';
import todos from '../../api/todos';
import TodoList from './TodoList';

describe('TodoList', () => {
  it('should have a correct length', () => {
    mount(<TodoList todos={todos} />);
    cy.get('li')
      .should('have.length', todos.length);
  });
});
