import React from 'react';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

export const TodoInfo: React.FC<{ todo: Todo }> = ({ todo }) => {
  const {
    id, title, completed, user,
  } = todo;

  return (
    <article data-id={id} className={`TodoInfo  ${completed ? 'TodoInfo--completed' : ''}`}>
      <h2 className="TodoInfo__title">
        {title}
      </h2>

      { user && <UserInfo user={user} />}
    </article>
  );
};
