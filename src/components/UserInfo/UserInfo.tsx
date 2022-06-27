import React from 'react';
import { User } from '../../app.typedef';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  const { name, email } = user;

  return (
    <ul>
      <li data-cy="username">{name}</li>
      <li data-cy="email">{email}</li>
    </ul>
  );
};
