import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    completed,
    id,
    title,
    user,
  } = todo;

  return (
    <article
      data-id={todo.id}
      className={`${completed === true ? 'TodoInfo TodoInfo--completed' : 'TodoInfo'} `}
      key={id}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      <UserInfo user={user} />
    </article>
  );
};
