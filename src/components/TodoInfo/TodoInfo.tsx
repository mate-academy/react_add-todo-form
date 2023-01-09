import React from 'react';
import { Todo } from '../../types/todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={`TodoInfo ${completed && 'TodoInfo--completed'}`}
      key={todo.id}
    >
      <h2 className="TodoInfo__title title is-4">
        {title}
      </h2>

      {user && <UserInfo user={user} />}
    </article>
  );
};
