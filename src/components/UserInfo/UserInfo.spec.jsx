import React from 'react';
import { mount } from '@cypress/react';
import { UserInfo } from './UserInfo';
import users from '../../api/users';

describe('UserInfo', () => {
  it('should have a correct name', () => {
    mount(<UserInfo user={users[0]} />);
    cy.getByDataCy('username')
      .should('have.text', users[0].name);
  });

  it('should have a correct email', () => {
    mount(<UserInfo user={users[0]} />);
    cy.getByDataCy('email')
      .should('have.text', users[0].email);
  });
});
