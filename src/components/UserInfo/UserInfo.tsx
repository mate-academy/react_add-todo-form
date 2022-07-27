import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User | null;
};

export const UserInfo: React.FC<Props | null> = ({ user }) => (
  <>
    {user && (
      <div>
        <p data-cy="username">
          <b>Username: </b>
          {user.name}
        </p>

        <p data-cy="email">
          <b>Email: </b>
          {user.email}
        </p>
      </div>
    )}
  </>
);
