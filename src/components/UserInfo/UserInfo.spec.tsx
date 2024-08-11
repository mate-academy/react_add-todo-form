import { mount } from '@cypress/react18';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  it('should show a user.name', () => {
    const user1 = {
      userName: 'Leanne Graham',
      userEmail: 'Sincere@april.biz',
    };

    mount(<UserInfo userData={user1} />);

    cy.get('.UserInfo').should('have.text', 'Leanne Graham');
  });

  it('should have a link with mailto: user.email', () => {
    const user1 = {
      userName: 'Leanne Graham',
      userEmail: 'Sincere@april.biz',
    };

    mount(<UserInfo userData={user1} />);

    cy.get('.UserInfo').should('have.attr', 'href', 'mailto:Sincere@april.biz');
  });

  it('should work for another user', () => {
    const user2 = {
      userName: 'Ervin Howell',
      userEmail: 'Shanna@melissa.tv',
    };

    mount(<UserInfo userData={user2} />);

    cy.get('.UserInfo')
      .should('have.text', 'Ervin Howell')
      .should('have.attr', 'href', 'mailto:Shanna@melissa.tv');
  });
});
