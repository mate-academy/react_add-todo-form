import React from 'react';
import type { User } from '../../api/types';

interface UserInfoProps {
  user: User;
}

export const UserInfo: React.FC<UserInfoProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={`mailto:${user.email}`} data-cy="userInfo">
      {user.name}
    </a>
  );
};
