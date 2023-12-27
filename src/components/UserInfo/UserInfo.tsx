import React from 'react';
import usersFromServer from '../../api/users';
import { Users } from '../../types/users';

type Props = {
  userId : number;
};

function getUser(userId: number) {
  return usersFromServer.find(user => user.id === userId)
    || null;
}

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const users: Users | null = getUser(userId);

  return (
    <a className="UserInfo" href={users?.email}>
      {users?.name}
    </a>
  );
};
