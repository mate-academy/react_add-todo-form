import React from 'react';
import usersFromServer from '../../api/users';

type Props = {
  userId: number;
  user?: {
    email?: string;
    id?: number;
    name?: string;
    username?: string;
  };
};

export const UserInfo: React.FC<Props> = ({ userId, user }) => {
  return (
    <a
      className="UserInfo"
      href={`mailto:${usersFromServer.find(u => u.id === userId)?.email || user?.email}`}
    >
      {usersFromServer.find(u => u.id === userId)?.name || user?.name}
    </a>
  );
};
