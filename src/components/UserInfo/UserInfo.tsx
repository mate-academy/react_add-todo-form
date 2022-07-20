import React from 'react';
import './UserInfo.scss';

type Props = {
  user: User;
};

const UserInfo: React.FC<Props> = ({ user }) => (
  <div className="user">
    <p className="user__name">{user.name}</p>
    <p className="user__email">{user.email}</p>
  </div>
);

export default UserInfo;
