import React from 'react';

import usersFromServer from '../../api/users';
import { User } from '../../types/types';

type Props = {
  userId: number,
};

export const findUserById = (users: User[], id: number) => {
  return users.find((user: User) => (id === user.id));
};

export const UserInfo: React.FC<Props> = ({
  userId,
}) => {
  const user = findUserById(usersFromServer, userId);

  return (
    <a className="UserInfo" href={`mailto: ${user?.email}`}>
      {user?.name}
    </a>
  );
};
