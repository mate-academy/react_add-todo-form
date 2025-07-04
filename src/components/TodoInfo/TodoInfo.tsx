import React from 'react';
import { UserInfo } from '../UserInfo';

interface User {
  id: number;
  name: string;
  email: string;
}

interface Todo {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
  user?: User;
}

interface TI {
  todo: Todo;
}

export const TodoInfo: React.FC<TI> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      {todo.user && <UserInfo user={todo.user} />}
    </article>
  );
};
