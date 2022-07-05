import React from 'react';

import { User } from '../../types/User';
import './UserInfo.scss';

export const UserInfo: React.FC<User> = React.memo(
  ({ name, email }) => (
    <div className="user">
      <div className="user__name">{name}</div>
      <a className="user__email" href={`mailto: ${email}`}>{email}</a>
    </div>
  ),
);
