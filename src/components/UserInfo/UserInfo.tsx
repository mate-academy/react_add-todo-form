import React from 'react';
import { User } from '../../react-app-env';

interface Props {
  user: User,
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <h2
      className="user__name"
      data-cy="username"
    >
      {user.name}
    </h2>
    <p
      className="user__email"
      data-cy="email"
    >
      {user.email}
    </p>
  </>
);
