import React from 'react';
import { User } from '../../types/User';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={'mailto:' + user?.email}>
    {user?.name}
  </a>
);
