import React from 'react';
import { User } from '../../interfaces';

export type UserInfoProps = {
  user: User;
};

export const UserInfo: React.FC<UserInfoProps> = React.memo(({ user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
    >
      {user.name}
    </a>
  );
});
