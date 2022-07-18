import React from 'react';
import { Users } from '../../types/Users';
import './UserInfo.scss';

type Props = {
  user: Users | null
};

export const UserInfo: React.FC<Props | null> = ({ user }) => (
  <>
    {user && (
      <div className="card__user-info">
        <p data-cy="username">
          {user.name}
        </p>
        <p data-cy="email">
          {user.email}
        </p>
      </div>
    )}
  </>
);
