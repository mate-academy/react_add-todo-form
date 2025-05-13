import { mount } from '@cypress/react18';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  it('should show a user.name', () => {
    const user1 = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    mount(<UserInfo user={user1} />);

    cy.get('.UserInfo').should('contain.text', user1.name);
  });

  it('should have a link with mailto: user.email', () => {
    const user1 = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    mount(<UserInfo user={user1} />);

    cy.get('.UserInfo a').should('have.attr', 'href', `mailto:${user1.email}`);
  });

  it('should work for another user', () => {
    const user2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    };

    mount(<UserInfo user={user2} />);

    cy.get('.UserInfo').should('contain.text', user2.name);
    cy.get('.UserInfo a').should('have.attr', 'href', `mailto:${user2.email}`);
  });
});
