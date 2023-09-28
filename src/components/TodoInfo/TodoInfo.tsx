import React from 'react';
import classNames from 'classnames';

import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const todoClasses = classNames('TodoInfo', {
    'TodoInfo--completed': todo.completed,
  });

  return (
    <article
      className={todoClasses}
      data-id={todo.id}
      key={todo.id}
    >
      <h2 className="TodoInfo__title">{todo.title}</h2>

      {todo.user && (
        <UserInfo user={todo.user} />
      )}
    </article>
  );
};
