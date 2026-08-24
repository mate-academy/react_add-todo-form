import React from 'react';

import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  user?: User;
}

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
