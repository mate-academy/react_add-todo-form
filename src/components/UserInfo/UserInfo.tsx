import React from 'react';
import { User } from '../../react-app-env';

interface Props {
  user: User;
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h2 data-cy="username">
      {user.name}
    </h2>

    <a href={`mailto:${user.email}`} data-cy="email">
      {user.email}
    </a>
  </>
);
