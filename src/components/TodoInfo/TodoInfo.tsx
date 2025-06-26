import React from 'react';
import { Todo } from '../../types/Todo';
import usersFromServer from '../../api/users';
import todosFromServer from '../../api/todos';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

function getUserById(userId: number) {
  return usersFromServer.find(user => user.id === userId) || null;
}

export const todos = todosFromServer.map(todo => ({
  ...todo,
  user: getUserById(todo.userId),
}));

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={getUserById(todo.user.id)} />}
    </article>
  );
};
