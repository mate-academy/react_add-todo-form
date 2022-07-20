import React from 'react';
import { User } from '../../types/user';
import userFromServer from '../../api/users';
import './userInfo.css';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user: User | undefined = userFromServer
    .find(user1 => userId === user1.id);

  return (
    <ul className="todoUser list">
      {user && (
        <>
          <p className="userName" data-cy="username">
            {user.name}
          </p>

          <p className="userEmail" data-cy="email">
            {user.email}
          </p>
        </>
      )}
    </ul>
  );
};
