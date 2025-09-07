import React from 'react';
import { UserInfo } from '../UserInfo';

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: User;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user ? (
        <UserInfo user={todo.user} />
      ) : (
        <span className="TodoInfo__no-user">No user found</span>
      )}
    </article>
  );
};
