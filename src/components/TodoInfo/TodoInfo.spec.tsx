import { mount } from '@cypress/react18';
import { TodoInfo } from './TodoInfo';

describe('TodoInfo', () => {
  it('should have a correct title', () => {
    const user = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    const todo = {
      userId: 1,
      id: 1,
      title: 'Learn HTML',
      completed: true,
    };

    mount(<TodoInfo todo={todo} user={user} />);

    cy.get('.TodoInfo__title').should('have.text', 'Learn HTML');
  });

  it('should add TodoInfo--completed class for a completed todo', () => {
    const user = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    const completedTodo = {
      userId: 1,
      id: 1,
      title: 'Learn HTML',
      completed: true,
    };

    mount(<TodoInfo todo={completedTodo} user={user} />);

    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
  });

  it('should NOT add TodoInfo--completed class for not completed todo', () => {
    const user = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    };

    const incompleteTodo = {
      userId: 2,
      id: 10,
      title: 'Learn CSS',
      completed: false,
    };

    mount(<TodoInfo todo={incompleteTodo} user={user} />);

    cy.get('.TodoInfo').should('not.have.class', 'TodoInfo--completed');
  });

  it('should have UserInfo', () => {
    const user = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    const todo = {
      userId: 1,
      id: 1,
      title: 'Learn HTML',
      completed: true,
    };

    mount(<TodoInfo todo={todo} user={user} />);

    cy.get('.UserInfo').should('have.text', 'Leanne Graham');
  });

  it('should work with the other todo', () => {
    const user = {
      id: 3,
      name: 'Clementine Bauch',
      username: 'Samantha',
      email: 'Nathan@yesenia.net',
    };

    const todo = {
      userId: 3,
      id: 48,
      title: 'sit reprehenderit omnis quia',
      completed: true,
    };

    mount(<TodoInfo todo={todo} user={user} />);

    cy.get('.TodoInfo__title').should(
      'have.text',
      'sit reprehenderit omnis quia',
    );
    cy.get('.TodoInfo').should('have.class', 'TodoInfo--completed');
    cy.get('.UserInfo').should('have.text', 'Clementine Bauch');
  });
});
