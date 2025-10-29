import React from 'react';
import { Todo } from '../../types';

type Props = {
  todo: Todo & { user: NonNullable<Todo['user']> };
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { title, completed, user } = todo;

  return (
    <article
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">{title}</h2>

      <a className="UserInfo" href={`mailto:${user.email}`}>
        {user.name}
      </a>
    </article>
  );
};
