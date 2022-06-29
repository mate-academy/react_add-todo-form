import React from 'react';
import { User } from '../../app.typedefs';

interface Props {
  user: User | null,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <>
      <div data-cy="username">{`Name: ${user?.name}`}</div>
      <div data-cy="email">{`Email: ${user?.email}`}</div>
    </>
  );
};
