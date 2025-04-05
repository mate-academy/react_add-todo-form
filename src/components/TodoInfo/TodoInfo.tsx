import React from 'react';
import { UserInfo } from '../UserInfo';

export interface TodoInfoProps {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
}

export const TodoInfo: React.FC<TodoInfoProps> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={todo.completed ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
