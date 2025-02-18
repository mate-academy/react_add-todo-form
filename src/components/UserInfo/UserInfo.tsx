import React from 'react';
import { User } from '../../props/User';

type UserProps = {
  user: User;
};

export const UserInfo: React.FC<UserProps> = ({ user }) => {
  return (
    <a className="UserInfo" href={user.email}>
      {user.name}
    </a>
  );
};
