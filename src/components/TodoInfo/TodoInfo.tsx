import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoClass = todo.completed ? 'TodoInfo--completed' : '';

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todoClass}`}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
