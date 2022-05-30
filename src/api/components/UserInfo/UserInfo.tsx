import React from 'react';
import './UserInfo.scss';

import { User } from '../../../types/User';

export const UserInfo: React.FC<User> = ({ name, email }) => (
  <div className="UserInfo">
    <span className="UserInfo__name" data-cy="username">
      {'Name: '}
      {name}
    </span>
    <span className="UserInfo__email" data-cy="email">
      <p>{'Email: '}</p>
      <a href="mailto:{email}">{email}</a>
    </span>
  </div>
);
