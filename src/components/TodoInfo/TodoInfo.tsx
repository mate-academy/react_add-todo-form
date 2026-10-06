import React from 'react';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    id: number;
    title: string;
    userId: number;
    completed: boolean;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
  };
};

export const TodoInfo = ({ todo }: Props) => {
  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
