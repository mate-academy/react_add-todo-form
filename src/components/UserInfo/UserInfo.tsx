import React from 'react';
import { User } from '../../types/User';

type UserType = {
  user: User;
};

export const UserInfo: React.FC<UserType> = ({ user }) => {
  const { name, email } = user;

  return (
    <a className="UserInfo" href={`mailto:${email}`}>
      {name}
    </a>
  );
};
