import React from 'react';
import classNames from 'classnames';

import { Todos } from '../../types/Todos';
import { UserInfo } from '../UserInfo';

interface Props{
  todo: Todos,
}

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo box', { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
