import React from 'react';
import { Users } from '../../types/users';
import usersFromServer from '../../api/users';

type Props = {
  userId : number;
};

function getUser(userId: number) {
  return usersFromServer.filter(user => user.id === userId)
    || null;
}

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const users: Users[] = getUser(userId);
  const userName = users.map(user => user.name);
  const userMail = users.map(user => user.email)[0];

  return (
    <a className="UserInfo" href={userMail}>
      {userName}
    </a>
  );
};
