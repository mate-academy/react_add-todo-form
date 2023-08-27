import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';
import { UserInfo } from '../UserInfo';

interface Props {
  todo: Todo;
}

export const TodoInfo: React.FC<Props> = (
  {
    todo:
      { completed, title, user },
  },
) => {
  const todoInfoClasses = classNames('TodoInfo',
    { 'TodoInfo--completed': completed });

  return (
    <article
      className={todoInfoClasses}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
