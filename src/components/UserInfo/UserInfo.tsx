import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User | null,
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="message notification is-primary is-light">
      <p data-cy="username">
        Username:
        {user?.name}
      </p>
      <a href="mailto:{user?.email}" data-cy="email">
        Registered email:
        {' '}
        {user?.email}
      </a>
    </div>
  );
};
