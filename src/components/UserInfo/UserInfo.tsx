import React from 'react';
import User from '../../types/User';

export const UserInfo: React.FC<User> = ({ name, email, username }) => (
  <>
    <div>
      {`Name: ${name}`}
    </div>
    <div data-cy="username">
      {`Username: ${username}`}
    </div>
    <div data-cy="email">
      {`Email: ${email}`}
    </div>
  </>
);
