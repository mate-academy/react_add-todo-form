import React from 'react';
import { User } from '../../types/user';

import './UserInfo.scss';

type Props = {
  user: User,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="user">
      <div className="user__name">{user.name}</div>
      <div className="user__email">{user.email}</div>
    </div>
  );
};
