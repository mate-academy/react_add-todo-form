import classNames from 'classnames';
import React from 'react';
import { UserInfo } from '../UserInfo';
import { Todo } from '../types';

interface Props { todo: Todo }

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    title,
    completed,
    user,
    id,
  } = todo;

  return (
    <article
      data-id={id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': completed },
      )}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (<UserInfo user={user} />)}
    </article>
  );
};
