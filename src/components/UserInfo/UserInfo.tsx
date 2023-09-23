import React from 'react';
import { User } from '../types/user';

interface UserInfoProps {
  user?: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  if (!user) {
    return <span className="UserInfo">Unknown User</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
