import React from 'react';
import { User } from '../../react-app-env';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    {user && (
      <>
        <p className="subtitle is-5" data-cy="username">
          {user.name}
        </p>
        <p data-cy="email">{user.email}</p>
      </>
    )}
  </>
);
