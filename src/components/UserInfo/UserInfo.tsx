import React from 'react';

import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const owerUserId: User | undefined = usersFromServer
    .find((user: User) => user.id === userId);

  let userEmail = '';
  let userName = '';

  if (owerUserId) {
    userEmail = owerUserId.email;
    userName = owerUserId.name;
  }

  return (
    <a className="UserInfo" href={`mailto:${userEmail}`}>
      {userName}
    </a>
  );
};
