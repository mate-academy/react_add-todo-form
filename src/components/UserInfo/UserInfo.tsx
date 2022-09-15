import React from 'react';
import { User } from '../../types/User';
import './UserInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <div data-cy="username">
        {user.name}
      </div>

      <div data-cy="email">
        {user.email}
      </div>
    </div>
  );
};
