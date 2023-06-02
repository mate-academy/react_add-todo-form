/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import { mount } from '@cypress/react';
import { TodoList } from './TodoList';

describe('TodoList', () => {
  describe('', () => {
    beforeEach(() => {
      const user1 = {
        id: 1,
        name: 'Leanne Graham',
        username: 'Bret',
        email: 'Sincere@april.biz',
      };

      const user2 = {
        id: 2,
        name: 'Ervin Howell',
        username: 'Antonette',
        email: 'Shanna@melissa.tv',
      };

      const todos = [
        {
          userId: 1,
          id: 1,
          title: 'First Todo',
          completed: false,
          user: user1,
        },
        {
          userId: 1,
          id: 2,
          title: 'Second Todo',
          completed: false,
          user: user1,
        },
        {
          userId: 2,
          id: 3,
          title: 'Third Todo',
          completed: false,
          user: user2,
        },
        {
          userId: 2,
          id: 4,
          title: 'Fourth Todo',
          completed: true,
          user: user2,
        },
      ];

      mount(<TodoList todos={todos} />);
    });

    it('should contain all the todos', () => {
      cy.get('.TodoInfo').should('have.length', 4);
    });

    it('should render todos in the correct order', () => {
      cy.get('.TodoInfo__title').eq(0).should('have.text', 'First Todo');
      cy.get('.TodoInfo__title').eq(3).should('have.text', 'Fourth Todo');
    });
  });

  describe('', () => {
    it('should render no todos is received an empty array', () => {
      mount(<TodoList todos={[]} />);

      cy.get('.TodoInfo').should('not.exist');
    });
  });
});
