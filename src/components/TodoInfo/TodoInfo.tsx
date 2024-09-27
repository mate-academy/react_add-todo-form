import cn from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: {
    user: {
      id: number;
      name: string;
      username: string;
      email: string;
    };
    id: number;
    title: string;
    completed: boolean;
    userId: number;
  };
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={cn('TodoInfo', {
        'TodoInfo--completed': todo.completed,
      })}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
