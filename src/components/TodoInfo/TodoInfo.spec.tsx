import { mount } from '@cypress/react18';
import { TodoInfo } from './TodoInfo';

describe('TodoInfo', () => {
  it('should have a correct title', () => {
    const user1Todo = {
      userName: 'Leanne Graham',
      userEmail: 'Sincere@april.biz',
      todoPost: {
        id: 1,
        title: 'Learn HTML',
        completed: true,
      },
    };

    mount(<TodoInfo todo={user1Todo} />);

    cy.get('.TodoInfo__title').should('have.text', 'Learn HTML');
  });

  it('should add TodoInfo--completed class for a completed todo', () => {
    const completedTodo = {
      userName: 'Leanne Graham',
      userEmail: 'Sincere@april.biz',
      todoPost: {
        id: 1,
        title: 'Learn HTML',
        completed: true,
      },
    };

    mount(<TodoInfo todo={completedTodo} />);

    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
  });

  it('should NOT add TodoInfo--completed class for not completed todo', () => {
    const notCompletedTodo = {
      userName: 'Ervin Howell',
      userEmail: 'Shanna@melissa.tv',
      todoPost: {
        id: 10,
        title: 'Learn CSS',
        completed: false,
      },
    };

    mount(<TodoInfo todo={notCompletedTodo} />);

    cy.get('.TodoInfo').should('not.have.class', 'TodoInfo--completed');
  });

  it('should have UserInfo', () => {
    const user1Todo = {
      userName: 'Leanne Graham',
      userEmail: 'Sincere@april.biz',
      todoPost: {
        id: 1,
        title: 'Learn HTML',
        completed: true,
      },
    };

    mount(<TodoInfo todo={user1Todo} />);

    cy.get('.UserInfo').should('contain.text', 'Leanne Graham');
  });

  it('should work with the other todo', () => {
    const anotherTodo = {
      userName: 'Clementine Bauch',
      userEmail: 'Nathan@yesenia.net',
      todoPost: {
        id: 48,
        title: 'sit reprehenderit omnis quia',
        completed: true,
      },
    };

    mount(<TodoInfo todo={anotherTodo} />);

    cy.get('.TodoInfo__title').should(
      'have.text',
      'sit reprehenderit omnis quia',
    );

    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
    cy.get('.UserInfo').should('contain.text', 'Clementine Bauch');
  });
});
