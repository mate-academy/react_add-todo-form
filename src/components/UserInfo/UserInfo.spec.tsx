import { mount } from '@cypress/react';
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

    cy.get('.UserInfo').should('have.text', 'Leanne Graham');
  });

  it('should have a link with mailto: user.email', () => {
    const user1 = {
      id: 1,
      name: 'Leanne Graham',
      username: 'Bret',
      email: 'Sincere@april.biz',
    };

    mount(<UserInfo user={user1} />);

    cy.get('.UserInfo').should('have.attr', 'href', 'mailto:Sincere@april.biz');
  });

  it('should work for another user', () => {
    const user2 = {
      id: 2,
      name: 'Ervin Howell',
      username: 'Antonette',
      email: 'Shanna@melissa.tv',
    };

    mount(<UserInfo user={user2} />);

    cy.get('.UserInfo')
      .should('have.text', 'Ervin Howell')
      .should('have.attr', 'href', 'mailto:Shanna@melissa.tv');
  });
});
