import React from 'react';
import { User } from '../PreparedTodos';

type Props = {
  user: User;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p className="UserInfo__item">
        {user.name}
      </p>

      <p className="UserInfo__item">
        <span>
          {user.username}
        </span>
      </p>

      <p className="UserInfo__item">
        {user.email}
      </p>
    </div>
  );
};
