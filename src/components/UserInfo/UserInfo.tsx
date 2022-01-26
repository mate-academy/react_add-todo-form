import React from 'react';
import './UserInfo.scss';

type Props = {
  user: User
};

export const UserInfo:React.FC<Props> = ({ user }) => (
  <div className="user">
    <p className="user__name">
      Name:
      <strong>{user.name}</strong>
    </p>
    <p className="user__email">
      E-mail:
      {user.email}
    </p>
  </div>
);
