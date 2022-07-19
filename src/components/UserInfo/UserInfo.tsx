import React from 'react';
import { User } from '../../types/User';

type Props = {
  user: User
};

export const UserInfo: React.FC<Props> = ({ user }) => (
  <>
    <div className="user__info" key={user.id}>
      <p data-cy="username">
        <strong>User: </strong>
        {user.name}
      </p>

      <p>
        <strong>Email: </strong>
        {user.email}
      </p>
    </div>
  </>
);
