import React from 'react';

import './UserInfo.css';

export interface User {
  name: string,
  username: string
  email: string,
}

type Props = {
  user: User;
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <div className="User">
    <div className="User__name" data-cy="name">{`Name: ${user.name}`}</div>
    <div className="User__username" data-cy="username">{`Username: ${user.username}`}</div>
    <div className="User__email" data-cy="email">{`Email: ${user.email}`}</div>
  </div>
);
