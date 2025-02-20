import React from 'react';
import { User } from '../../types/User';
import usersFromServer from '../../api/users';
interface Props {
  user: number;
}

function getUserById(usersId: number): User | undefined {
  return usersFromServer.find(user => user.id === usersId);
}

export const UserInfo: React.FC<Props> = ({ user }) => (
  <a className="UserInfo" href={`mailto:${getUserById(user)?.email}`}>
    {getUserById(user)?.name}
  </a>
);
