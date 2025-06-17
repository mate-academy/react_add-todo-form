import React from 'react';
import { Todo } from '../../types';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  if (!todo.user) return null;

  return (
    <article
      data-id={todo.id}
      className={`TodoInfo ${todo.completed ? 'TodoInfo--completed' : ''}`}
      data-cy="todoInfo"
    >
      <h2 className="TodoInfo__title" data-cy="todoTitle">
        {todo.title}
      </h2>
      <UserInfo user={todo.user} />
    </article>
  );
};
