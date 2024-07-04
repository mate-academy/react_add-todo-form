import React from 'react';
import users from '../../api/users';
import { User } from '../../types/User';

interface Props {
  userId: number;
}

function getUserById(userId: number): User | undefined {
  return users.find(user => userId === user.id);
}

export const UserInfo: React.FC<Props> = ({ userId }) => {
  const user = getUserById(userId);

  return (
    <a className="UserInfo" href={user && `mailto:${user.email}`}>
      {user && user.name}
    </a>
  );
};
