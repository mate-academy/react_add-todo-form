import { mount } from '@cypress/react';
import { TodoList } from './TodoList';

describe('TodoList', () => {
  it('should contain all the todos', () => {
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
        title: 'delectus aut autem',
        completed: false,
        user: user1,
      },
      {
        userId: 1,
        id: 2,
        title: 'quis ut nam facilis et officia qui',
        completed: false,
        user: user1,
      },
      {
        userId: 2,
        id: 3,
        title: 'fugiat veniam minus',
        completed: false,
        user: user2,
      },
      {
        userId: 2,
        id: 4,
        title: 'et porro tempora',
        completed: true,
        user: user2,
      },
    ];

    mount(<TodoList todos={todos} />);

    cy.get('.TodoInfo')
      .should('have.length', 4);

    cy.get('.TodoInfo')
      .first()
      .find('.TodoInfo__title')
      .should('have.text', 'delectus aut autem');

    cy.get('.TodoInfo')
      .last()
      .find('.TodoInfo__title')
      .should('have.text', 'et porro tempora');
  });
});
