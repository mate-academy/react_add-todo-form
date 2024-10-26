import React from 'react';
import { User } from '../../types';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p>User: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
};
