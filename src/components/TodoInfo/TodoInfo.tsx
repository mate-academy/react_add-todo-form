import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    id,
    completed,
    user,
  } = todo;

  return (
    <article
      data-id={id}
      className={completed
        ? 'TodoInfo TodoInfo--completed'
        : 'TodoInfo'}
    >
      <h2 className="TodoInfo__title">
        {title}
      </h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
