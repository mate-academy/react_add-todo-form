import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../../App';

import usersFromServer from '../../api/users';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const getUserById = (selectedUserId: number) => {
    return usersFromServer.find(user => user.id === selectedUserId);
  };

  const currentUser = getUserById(todo.userId);

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {currentUser && <UserInfo user={currentUser} />}
    </article>
  );
};
