import React from 'react';
import { User } from '../types/User';
import './UserInfo.scss';

type Props = {
  user: User | null,
};

const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <div className="user">
      <div className="user__info">
        <h3 className="user__name" data-cy="username">
          {user.name}
          {' | '}
          {user.username}
          {' | '}
          {`ID #${user.id}`}
        </h3>
      </div>

      <h4 className="user__mail" data-cy="email">{user.email}</h4>
    </div>
  );
};

export default UserInfo;
