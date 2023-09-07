// import React from 'react';
import { User } from '../../types';

interface UserInfoProps {
  user: User | null;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${user?.email}`}>
    {user?.name}
  </a>
);
