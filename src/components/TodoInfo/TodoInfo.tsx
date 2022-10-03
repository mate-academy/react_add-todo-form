import React from 'react';
import classNames from 'classnames';

import { UserInfo } from '../UserInfo';
import { Todo } from '../types/Todo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const {
    id,
    title,
    user,
    completed,
  } = todo;
  const todoInfoClasses = classNames(
    'TodoInfo',
    {
      'TodoInfo--completed': completed,
    },
  );

  return (
    <article className={todoInfoClasses} data-id={id}>
      <h2 className="TodoInfo__title">{title}</h2>
      {user && (<UserInfo user={user} />)}
    </article>
  );
};
