import React from 'react';
import { UserInfo, User } from '../UserInfo';

interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: User | null;
  };
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => (
  <article
    className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    data-id={todo.id}
  >
    <h2 className="TodoInfo__title">{todo.title}</h2>
    <UserInfo user={todo.user} />
  </article>
);
