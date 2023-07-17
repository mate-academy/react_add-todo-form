import React from 'react';

import usersFromServer from '../../api/users';
import { User } from '../../types/User';

type Props = {
  userId: number,
};

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const userDate: User | undefined = usersFromServer
    .find((user: User) => user.id === userId);

  let userEmail = '';
  let userName = '';

  if (userDate) {
    userEmail = userDate.email;
    userName = userDate.name;
  }

  return (
    <a className="UserInfo" href={`mailto:${userEmail}`}>
      {userName}
    </a>
  );
};
