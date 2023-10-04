import React from 'react';
import { ToDo } from '../../types/ToDo';
import usersFromServer from '../../api/users';
import { User } from '../../types/User';

interface Props {
  toDo: ToDo
}

type Callback = (x: User[], y: number) => User | undefined;

const getUserById: Callback = (users, userId) => {
  return users.find(user => user.id === userId);
};

export const UserInfo: React.FC<Props> = ({ toDo }) => {
  const currentUser = getUserById(usersFromServer, toDo.userId);

  return (
    <a className="UserInfo" href={`mailto:${currentUser?.email}`}>
      {currentUser?.name}
    </a>
  );
};
