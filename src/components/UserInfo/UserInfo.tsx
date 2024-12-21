import React from 'react';
import { Todo, User } from '../../types/types';
import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

function getUser(arrUsers: User[], userId: number): User | undefined {
  return arrUsers.find(el => el.id === userId);
}

export const UserInfo: React.FC<Props> = ({ todo }) => {
  const user = getUser(usersFromServer, todo.userId);

  if (!user) {
    return <span className="UserInfo">Unknown User</span>;
  }

  return (
    <a className="UserInfo" href={`mailto:${user.email}`}>
      {user.name}
    </a>
  );
};
