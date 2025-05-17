import React from 'react';
import { User } from '../../types/user';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a href={`mailto:${user.email}`} className="UserInfo">
    {user.name}
  </a>
);
