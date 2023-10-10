import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo, User } from '../Interfaces';
import usersFromServer from '../../api/users';

import './TodoInfo.scss';

interface Props {
  todo: Todo;
}

const userById = (userId: number): User | undefined => {
  return usersFromServer.find(user => user.id === userId);
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const user = userById(todo.userId);

  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      { user && (
        <UserInfo
          user={user}
        />
      )}
    </article>
  );
};
