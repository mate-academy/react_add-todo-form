import React from 'react';
import { UserInfo } from '../UserInfo';

type User = {
  id: number;
  name: string;
  email: string;
};

type Todo = {
  id: number;
  title: string;
  completed: boolean;
  user: User;
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      key={todo.id}
      data-id={todo.id}
      className={`TodoInfo${todo.completed ? ' TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
