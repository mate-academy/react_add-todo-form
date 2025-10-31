import React from 'react';

import { UserInfo } from '../UserInfo';

interface Props {
  todo: {
    id: number;
    title: string;
    completed: boolean;
    userId: number;
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    } | null;
  };
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const hasUser = todo.user !== null;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {hasUser && <UserInfo user={todo.user} />}
    </article>
  );
};
