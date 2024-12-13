import React from 'react';
import { UserInfo } from '../UserInfo';

type TodoInfoProps = {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user?: {
      name: string;
      email: string;
    } | null;
  };
};

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    data-id={todo.id}
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    {todo.user && <UserInfo user={todo.user} />}
  </article>
);
