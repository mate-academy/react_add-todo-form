import React from 'react';
import classNames from 'classnames';

import { ToDo } from '../../types/ToDo';
import { UserInfo } from '../UserInfo';

type Props = {
  todo: ToDo,
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  return (
    <article
      data-id={todo.id}
      className={classNames(
        'TodoInfo',
        { 'TodoInfo--completed': todo.completed },
      )}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      {todo.user && <UserInfo user={todo.user} />}

    </article>
  );
};
