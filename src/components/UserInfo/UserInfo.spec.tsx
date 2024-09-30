import { mount } from '@cypress/react18';
import { UserInfo } from './UserInfo';

describe('UserInfo', () => {
  it('should show a user name', () => {
    const userName = 'Leanne Graham';
    const userEmail = 'Sincere@april.biz';

    mount(<UserInfo name={userName} email={userEmail} />);

    cy.get('.UserInfo').should('have.text', 'Leanne Graham');
  });

  it('should have a link with mailto: user email', () => {
    const userName = 'Leanne Graham';
    const userEmail = 'Sincere@april.biz';

    mount(<UserInfo name={userName} email={userEmail} />);

    cy.get('.UserInfo').should('have.attr', 'href', 'mailto:Sincere@april.biz');
  });

  it('should work for another user', () => {
    const userName = 'Ervin Howell';
    const userEmail = 'Shanna@melissa.tv';

    mount(<UserInfo name={userName} email={userEmail} />);

    cy.get('.UserInfo')
      .should('have.text', 'Ervin Howell')
      .should('have.attr', 'href', 'mailto:Shanna@melissa.tv');
  });
});
