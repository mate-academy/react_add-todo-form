import React from 'react';
import { User } from '../PreparedTodos';

type Props = {
  user: User | null | undefined;
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  return (
    <div className="UserInfo">
      <p className="UserInfo__item">
        {user ? user.name : null}
      </p>

      <p className="UserInfo__item">
        <span>
          {user ? user.username : null}
        </span>
      </p>

      <p className="UserInfo__item">
        {user ? user.email : null}
      </p>
    </div>
  );
};
