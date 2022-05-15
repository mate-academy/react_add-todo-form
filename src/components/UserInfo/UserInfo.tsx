import React from 'react';

import { User } from '../../types/User';

// import './UserInfo.scss';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="userInfo">
    <div className="userInfo__name">{user.name}</div>
    <div className="userInfo__mail">{user.email}</div>
  </div>
);
