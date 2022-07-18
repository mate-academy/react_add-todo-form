import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <p data-cy="username">{user?.name}</p>
      <a href={user?.email} data-cy="email">{user?.email}</a>
    </>
  );
};
