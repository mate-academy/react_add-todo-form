/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { mount } from '@cypress/react';
import TodoInfo from './TodoInfo';

describe('TodoInfo', () => {
  it('should have a correct title', () => {
    const todo = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    mount(<TodoInfo todo={todo} />);
    cy.getByDataCy('title')
      .should('have.text', todo.title);
  });

  it('should have a correct status', () => {
    const notCompletedTodo = {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
    };

    mount(<TodoInfo todo={notCompletedTodo} />);
    cy.getByDataCy('status')
      .should('have.text', 'Not completed!');

    const completedTodo = {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: true,
    };

    mount(<TodoInfo todo={completedTodo} />);
    cy.getByDataCy('status')
      .should('have.text', 'Completed!');
  });
});
