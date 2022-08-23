import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo/UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo:React.FC<Props> = ({ todo }) => {
  const {
    user,
    title,
    completed,
  } = todo;

  const isComplete = completed && 'TodoInfo--completed';

  return (
    <article data-id={todo.id} className={`TodoInfo ${isComplete}`}>
      <h2 data-cy="titleInput" className="TodoInfo__title">{title}</h2>
      {user
        && <UserInfo user={user} />}
    </article>
  );
};
