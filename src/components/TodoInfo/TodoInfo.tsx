import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const { id, title, completed, user } = todo;

  return (
    <article
      className={`TodoInfo ${completed ? 'TodoInfo--completed' : ''}`}
      data-id={id}
    >
      <h3 className="TodoInfo__title">{title}</h3>
      {user && <UserInfo user={user} />}
    </article>
  );
};