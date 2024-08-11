import { mount } from '@cypress/react18';
import { TodoList } from './TodoList';
import { UserTodos } from '../../App';

describe('TodoList', () => {
  it('should contain all the todos', () => {
    const userList: UserTodos[] = [
      {
        userId: 1,
        userName: 'Leanne Graham',
        userEmail: 'Sincere@april.biz',
        userLogin: 'Bret',
        todoPosts: [
          {
            id: 1,
            title: 'delectus aut autem',
            completed: false,
            userId: 1,
            createdAt: new Date(),
          },
          {
            id: 2,
            title: 'quis ut nam facilis et officia qui',
            completed: false,
            userId: 1,
            createdAt: new Date(),
          },
        ],
      },
      {
        userId: 2,
        userName: 'Ervin Howell',
        userEmail: 'Shanna@melissa.tv',
        userLogin: 'Antonette',
        todoPosts: [
          {
            id: 3,
            title: 'fugiat veniam minus',
            completed: false,
            userId: 2,
            createdAt: new Date(),
          },
          {
            id: 4,
            title: 'et porro tempora',
            completed: true,
            userId: 2,
            createdAt: new Date(),
          },
        ],
      },
    ];

    mount(<TodoList userList={userList} />);

    cy.get('.TodoInfo').should('have.length', 4);

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
