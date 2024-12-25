import React from 'react';
import { UserInfo } from '../UserInfo/UserInfo';

type Todo = {
  id: number;
  title: string;
  user: { name: string; email: string };
  completed: boolean;
};

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
