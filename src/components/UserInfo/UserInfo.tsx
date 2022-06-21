import React from 'react';
import { User } from '../../app.typedefs';

interface Props {
  user: User | null,
}

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <ul>
      <li data-cy="username">{`Name: ${user?.name}`}</li>
      <li data-cy="email">{`Email: ${user?.email}`}</li>
    </ul>
  );
};
