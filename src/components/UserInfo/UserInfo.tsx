import React from 'react';

import usersFromServer from '../../api/users';

import { User } from '../../react-app-env';

interface Props {
  userId: number;
}

export const UserInfo: React.FC<Props> = ({
  userId,
}) => {
  let user: User | undefined = usersFromServer.find(u => u.id === +userId);

  if (!user) {
    user = {
      id: Date.now(),
      name: 'No name',
      username: 'No name',
      email: '#',
    };
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
