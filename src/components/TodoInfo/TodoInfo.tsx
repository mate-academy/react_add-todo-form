import React from 'react';
import classNames from 'classnames';
import { Todo } from '../../types/Todo';

import { UserInfo } from '../UserInfo/UserInfo';

type TodoType = {
  todo: Todo;
};

export const TodoInfo: React.FC<TodoType> = ({ todo }) => {
  const { title, user, completed } = todo;

  const todoClass = classNames(
    'TodoInfo',
    { 'TodoInfo--completed': completed },
  );

  return (
    <article
      data-id={todo.id}
      className={todoClass}
    >
      <h2 className="TodoInfo__title">{title}</h2>
      {user && <UserInfo user={user} />}
    </article>
  );
};
